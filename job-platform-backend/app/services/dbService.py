from motor.motor_asyncio import AsyncIOMotorClient
from app.db import db

conversation_collection = db["conversation"]

agent_instructions = """
## 🏁 Goal  
user send you a company name, you should check if there is a company like that and return information about it.
"""

prompt = {"role": "system", "content": agent_instructions}

async def create_conversation(session_id):
    await conversation_collection.insert_one({
        "session_id": session_id,
        "message": [prompt]
    })

async def get_conversation(session_id):
    return await conversation_collection.find_one({"session_id": session_id})

async def save_message(session_id, role, content):
    await conversation_collection.update_one(
        {"session_id": session_id},
        {"$push": {"message": {"role": role, "content": content}}}
    )

async def get_all_messages(session_id):
    conversation = await get_conversation(session_id)
    if conversation:
        return conversation.get("message", [])
    return []


