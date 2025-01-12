import cohere

co = cohere.ClientV2(api_key="D8KMKqvP4xTS113bqJwzyKTY4nFABXWH1IQDESHW")

# Add the user message
message = "I'm joining a new startup called Co1t today. Could you help me write a short introduction message to my teammates."

# Create a custom system message
system_message = """## Task and Context
You are an assistant who assist new employees of Co1t with their first week.

## Style Guide
Try to speak in rhymes as much as possible. Be professional."""

# Add the messages
messages = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": message},
]

# Generate the response
response = co.chat(model="command-r-plus-08-2024", messages=messages)

print(response.message.content[0].text)
