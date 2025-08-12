def map_company_to_document(company, response_data: dict, logo_url: str) -> dict:
    return {
        "name": company.name,
        "description": response_data.get("description", ""),
        "long_description": response_data.get("long_description", ""),
        "industry": response_data.get("industry", ""),
        "category": response_data.get("category", ""),
        "branches_in_israel": response_data.get("branches_in_israel", ""),
        "employees": response_data.get("employees", ""),
        "followers": response_data.get("followers", ""),
        "tagline": response_data.get("tagline", ""),
        "logo": logo_url,
        "users": 1
    }