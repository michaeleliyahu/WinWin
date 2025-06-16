from bson import ObjectId


class CompanyModel:
    def __init__(self, _id: ObjectId, name: str):
        self._id = _id
        self.name = name
