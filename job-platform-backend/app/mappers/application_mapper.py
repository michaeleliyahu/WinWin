from datetime import datetime
from bson import ObjectId
from app.schemas.application_schema import ApplicationForm

def map_application_document(doc: dict) -> dict:
    first = doc.get("firstName", "")
    last = doc.get("lastName", "")
    name = f"{first} {last}".strip()

    return {
        "id": str(doc.get("_id")),
        "name": name,
        "role": doc.get("jobLink") or "N/A",
        "submittedTime": (
            doc.get("uploaded_at").isoformat()
            if isinstance(doc.get("uploaded_at"), datetime)
            else None
        ),
        "fileType": "PDF",  # TODO: derive from metadata
        "fileSize": "—",    # TODO: compute from GridFS
        "isHandled": doc.get("submit", False),
        "avatar": (first[:1] + last[:1]) if first or last else "??",
        "fileId": str(doc.get("resume_file_id")) if doc.get("resume_file_id") else None,
    }


def map_application_form_to_document(form: ApplicationForm, file_id) -> dict:
    return {
        "firstName": form.firstName,
        "lastName": form.lastName,
        "mobileNumber": form.mobileNumber,
        "email": form.email,
        "jobLink": form.jobLink,
        "companyId": form.companyId,
        "userId": form.userId,
        "resume_file_id": file_id,
        "submit": False,
        "uploaded_at": datetime.utcnow()
    }