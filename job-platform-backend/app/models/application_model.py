from bson import ObjectId


class ApplicationModel:
    def __init__(
        self,
        _id: ObjectId,
        userId: str,
        companyId: str,
        jobLink: str,
        resumeLink: str,
        email: str,
        phone: str,
        submitted: bool = False,
    ):
        self._id = _id
        self.userId = userId
        self.companyId = companyId
        self.jobLink = jobLink
        self.resumeLink = resumeLink
        self.email = email
        self.phone = phone
        self.submitted = submitted
