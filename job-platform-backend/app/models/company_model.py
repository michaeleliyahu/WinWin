from bson import ObjectId


class CompanyModel:
    def __init__(self, _id: ObjectId, name: str, description: str = "", number_of_employees: int = 0):
        self._id = _id
        self.name = name
        self.description = description
        self.number_of_employees = number_of_employees
