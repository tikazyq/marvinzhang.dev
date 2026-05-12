#!/usr/bin/env python3
"""
Render an HTML file to PNG using Playwright at 2x DPR.

Usage:
    python scripts/render.py <html_path> [--preset NAME] [--width W --height H]
                             [--out PATH] [--full-page] [--selector SEL]

Presets (viewport in CSS pixels; output is 2x):
    architecture   1360 x 1080   dense layered diagrams, leadership-grade
    architecture-s 1280 x  980   smaller architecture, side-by-side fit
    blog-cover     1200 x  675   16:9 banner / hero image
    blog-square    1200 x 1200   social-friendly, single concept
    poster         1440 x 1800   tall poster / explainer

The script:
  - Renders at device_scale_factor=2 (crisp on retina + PPT zoom)
  - Waits networkidle + 2000ms for web fonts to settle (critical for IBM Plex etc.)
  - By default crops to .canvas if present, else .container, else main,
    else full page. Override with --selector or --full-page.
"""

import argparse
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

PRESETS = {
    "architecture":   (1360, 1080),
    "architecture-s": (1280, 980),
    "blog-cover":     (1200, 675),
    "blog-square":    (1200, 1200),
    "poster":         (1440, 1800),
}

DEFAULT_CROP_SELECTORS = [".canvas", ".container", "main"]


async def render(html_path: Path, viewport: tuple[int, int], out_path: Path,
                 full_page: bool, selector: str | None) -> None:
    width, height = viewport
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": width, "height": height},
            device_scale_factor=2,
        )
        await page.goto(html_path.resolve().as_uri())
        await page.wait_for_load_state("networkidle")
        # Web fonts (Google Fonts, etc.) often paint after networkidle.
        # 2000ms is empirically enough for IBM Plex / Inter / system fonts.
        await page.wait_for_timeout(2000)

        target = None
        if not full_page:
            candidates = [selector] if selector else DEFAULT_CROP_SELECTORS
            for sel in candidates:
                if sel:
                    target = await page.query_selector(sel)
                    if target:
                        break

        if target:
            await target.screenshot(path=str(out_path))
            box = await target.bounding_box()
            css_dims = (f"{int(box['width'])}x{int(box['height'])}"
                        if box else "unknown (element not visible)")
        else:
            await page.screenshot(path=str(out_path), full_page=True)
            css_dims = f"{width}x{height} (full page)"

        await browser.close()

    print(f"  source:   {html_path}")
    print(f"  viewport: {width}x{height} CSS @ 2x DPR")
    print(f"  cropped:  {css_dims} CSS")
    print(f"  output:   {out_path}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("html", help="Path to HTML file to render")
    ap.add_argument("--preset", choices=PRESETS.keys(),
                    help="Viewport preset (see header)")
    ap.add_argument("--width", type=int, help="Custom viewport width (CSS px)")
    ap.add_argument("--height", type=int, help="Custom viewport height (CSS px)")
    ap.add_argument("--out", help="Output PNG path (default: <html>.png)")
    ap.add_argument("--full-page", action="store_true",
                    help="Capture full page instead of cropping")
    ap.add_argument("--selector", help="CSS selector to crop to (overrides defaults)")
    args = ap.parse_args()

    html_path = Path(args.html)
    if not html_path.exists():
        print(f"error: {html_path} not found", file=sys.stderr)
        return 1

    if args.preset:
        viewport = PRESETS[args.preset]
    elif args.width and args.height:
        viewport = (args.width, args.height)
    elif args.width or args.height:
        print("error: --width and --height must be given together", file=sys.stderr)
        return 1
    else:
        viewport = PRESETS["architecture"]
        print(f"  (no preset/dims given, using 'architecture' default)")

    out_path = Path(args.out) if args.out else html_path.with_suffix(".png")
    out_path.parent.mkdir(parents=True, exist_ok=True)

    asyncio.run(render(html_path, viewport, out_path, args.full_page, args.selector))
    return 0


if __name__ == "__main__":
    sys.exit(main())
