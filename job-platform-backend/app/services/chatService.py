from .llmService import ask_openai
from .dbService import save_message, get_conversation, create_conversation, get_all_messages
import uuid
import json
from typing import Optional

def try_parse_final_plan(response: str) -> Optional[dict]:
    """
    Try to parse the response as a final learning plan JSON.
    Returns the parsed dict if it's valid, or None otherwise.
    """
    try:
        data = json.loads(response)
        if data.get("type") == "final_plan":
            return data
    except json.JSONDecodeError:
        pass
    return None

async def handle_conversation(user_input, session_id: str | None):
    if not session_id or await get_conversation(session_id) is None:
        session_id = str(uuid.uuid4())
        await create_conversation(session_id)

    context = await get_all_messages(session_id)
    context.append({"role": "user", "content": user_input})

    response = await ask_openai(context)

    final_plan = try_parse_final_plan(response)
    if final_plan:
        return {"response": final_plan.get("plan", {}), "session_id": session_id, "end": True}

    # If not a final plan, continue the conversation normally
    await save_message(session_id, "user", user_input)
    await save_message(session_id, "assistant", response)

    return {"response": response, "session_id": session_id, "end": False}





