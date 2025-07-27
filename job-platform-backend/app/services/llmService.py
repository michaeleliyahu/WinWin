import openai
import os
from openai import AsyncOpenAI

async def ask_openai(messages):
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise Exception("❌OpenAI API Key not found in environment variables.")

        client = openai.AsyncOpenAI(api_key=api_key)

        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
             messages=messages
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print("❌ error on api", e)
        raise


    