from supabase import create_client, Client
from dotenv import load_dotenv
import os
import json

load_dotenv() 
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(url, key)

orgs_data = supabase.from_("orgs_json").select("*").execute()

orgs_json = orgs_data.data[0]

with open("output.json", "w") as file:
    json.dump(orgs_json["json_build_object"], file)
# # print(type(json_string))
# python_object = json.loads(json_string)
# EXPORT TO JSON

# orgs_json = json.dumps([row for row in orgs_data], indent=2)

# print(orgs_json[0])