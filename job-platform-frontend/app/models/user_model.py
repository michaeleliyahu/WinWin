from bson import ObjectId


class UserModel:
    def __init__(self, _id: ObjectId, first_name: str, last_name: str, email: str, password: str, auth_provider: str = "local", google_id: str = None, company_id: str = None):
        self._id = _id
        self.firstName = first_name
        self.lastName = last_name
        self.email = email
        self.password = password
        self.authProvider = auth_provider
        self.googleId = google_id
        self.companyId = company_id
