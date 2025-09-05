# OpenAI Function Call API in Langchain Library

## Introduction

While exploring the field of artificial intelligence, we often need to leverage existing APIs to implement specific functionalities. Recently, while exploring the Langchain library, I discovered an interesting feature: using OpenAI's **function call API** to perform specific operations in a chain. This not only demonstrates how to obtain structured outputs from ChatOpenAI but also how to create and execute function chains. This feature offers us a new possibility, enabling the execution of multiple functions within a chain. Through this approach, we can obtain **structured** outputs based on specific inputs, thus providing more **accurate** data for subsequent operations.

## LangChain OpenAI Functions

Firstly, we need to understand how to obtain structured outputs from ChatOpenAI. In the Langchain library, there's a `create_structured_output_chain` function that can accept either a Pydantic class or JsonSchema for structured output formatting. This way, we can **force the model to return outputs in a specific structure**, facilitating subsequent processing.

For instance, we can create a `Person` class to describe basic information about an individual:

```python
from langchain.pydantic_v1 import BaseModel, Field   

class Person(BaseModel):  
    """Identifying information about a person."""  

    name: str = Field(..., description="The person's name")  
    age: int = Field(..., description="The person's age")  
    fav_food: Optional[str] = Field(None, description="The person's favorite food")  
```

Then, we can create a chain to process specific inputs and attempt to extract structured information from them. For example, we can create the following chain to process the input “Sally is 13”:

```python
llm = ChatOpenAI(model="gpt-4", temperature=0)  
prompt = ChatPromptTemplate.from_messages(  
    [  
        ("system", "You are a world class algorithm for extracting information in structured formats."),  
        ("human", "Use the given format to extract information from the following input: {input}"),  
        ("human", "Tip: Make sure to answer in the correct format"),  
    ]  
)  

chain = create_structured_output_chain(Person, llm, prompt, verbose=True)  
chain.run("Sally is 13")  
```

The result is as follows:

```python
Person(name='Sally', age=13, fav_food='Unknown')  
```

In this way, we successfully extracted structured information from the text. Similarly, we can process more complex inputs, like texts containing information about multiple individuals. Additionally, we can use JsonSchema to specify the desired structure instead of a Pydantic class.

Note, in the above example, the description of classes and fields is crucial as it dictates the output content by the large model.

## Implementing Text Translation

In the Langchain library, the `create_structured_output_chain` function provides us with a concise way to handle specific tasks and obtain structured outputs. For instance, we can leverage this feature to implement text translation. Firstly, we need to define a Pydantic model to describe the output structure of the translation, as follows:

```python
from langchain.pydantic_v1 import BaseModel, Field

class Translation(BaseModel):
    translation: str = Field(..., description="Translated text")
```

Next, we initialize the `ChatOpenAI` model and create a translation prompt template:

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4", temperature=0)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a translation model capable of translating English text to Chinese."),
    ("human", "Translate the following text: {input}")
])
```

Lastly, we utilize the `create_structured_output_chain` function to create a function chain, and run the chain to translate a specified text:

```python
from langchain.chains.openai_functions import create_structured_output_chain

chain = create_structured_output_chain(Translation, llm, prompt, verbose=True)

result = chain.run("Hello, how are you?")

print(result)
```

Thus, we obtained the translation result, while ensuring the output is structured, which can be beneficial for downstream operations.

## Conclusion

Through the examples above, we can see that Langchain, via the `create_structured_output_chain` function, provides us with an effective way to achieve **structured** outputs for specific tasks. This approach not only simplifies the code but also significantly improves our **efficiency in processing and extracting structured information**. As AI technology continues to evolve, structured outputs will play a significant role in data processing, information extraction, and natural language processing, among other fields. I believe that this feature of Langchain will find wide application, providing more convenience for developers and researchers.

## Community

If you're interested in the author's article, you can follow me on X (Twitter) [@marvinzhang89](https://twitter.com/marvinzhang89).