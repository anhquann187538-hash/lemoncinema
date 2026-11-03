# Security Specification: Cinema Character Vault

## 1. Data Invariants
- Each Character must have a unique alphanumeric/dash ID under 128 characters (`isValidId`).
- `name` must be a non-empty string with maximum length of 100 characters.
- `saveCount` must be an integer >= 0.
- `order` must be an integer.
- `tags` must be a list containing at most 10 items.
- String fields like `story`, `greeting`, `description`, `avatarUrl`, `link*` must obey strict size caps to prevent payload injection and Denial of Wallet attacks.
- Public read access is permitted so visitors can browse the cinema character directory.
- Incremental like updates are strictly audited to only mutate `saveCount` (+1) and `updatedAt`.

## 2. The "Dirty Dozen" Threat Vectors
1. ID Injection: Path traversal characters in `characterId`.
2. Giant String: Name exceeding 100 characters.
3. Giant Lore/Story: Story exceeding 10,000 characters.
4. Unbounded Array: Tags array with > 10 items.
5. Negative Counter: Attempting to set `saveCount` to a negative integer.
6. Like Manipulation: Updating character details under the guise of an audience like action.
7. Unlisted Field / Shadow Injection: Sending arbitrary unknown properties.
8. Type Mutation: Setting `order` to a string instead of integer.
9. Type Mutation: Setting `isNew` to an arbitrary string or object.
10. Malformed Tags: Passing non-string elements into the tags array.
11. Non-conforming URLs: Exceeding 1000 characters on link endpoints.
12. Blank Character Name: Creating or updating an entry with an empty string name.
