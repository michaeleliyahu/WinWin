from fastapi import HTTPException

async def send_email(to_email: str, subject: str, body: str):
    """
    Send an email. Only Mock for now
    """
    try:
        print(f"📧 Sending email to {to_email} - {subject}")
        print(f"Body:\n{body}")
        # שליחה בפועל...
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
