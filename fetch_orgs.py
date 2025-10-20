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
with open("orgs.json", "w") as file:
    json.dump(orgs_json["json_build_object"], file, indent=4)

tags_data = supabase.from_("tag_list").select("*").execute()
tags_json = tags_data.data[0]
with open("tags.json", "w") as file:
    json.dump(tags_json["json_build_object"], file, indent=4)