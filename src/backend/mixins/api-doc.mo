mixin () {
  /// Static Markdown documentation of this backend's public API.
  public query func getApiDoc() : async Text {
    "# Que Professional Services — Backend API\n\n" #
    "Backend for the Que Professional Services website (Simunye, Eswatini). It captures\n" #
    "quote requests submitted through the public site and lets the business owner review\n" #
    "them. It also exposes the inquiry data to the Caffeine Data Intelligence agent\n" #
    "through the Object Query Layer (OQL).\n\n" #
    "## Public methods\n\n" #
    "### `submitInquiry(input : InquiryInput) : async Nat`\n\n" #
    "Saves a quote request and returns the new inquiry's numeric id.\n\n" #
    "- **Authentication:** none. Any caller may submit, including anonymous visitors.\n" #
    "- **Input fields** (all `Text`): `name`, `phone`, `email`, `service`, `message`.\n" #
    "- **Returns:** the assigned `id` (`Nat`), monotonically increasing from `0`.\n" #
    "- **Retry safety:** NOT idempotent. Each successful call creates a new inquiry and\n" #
    "  consumes a new id, so a retried call produces a duplicate record. The frontend\n" #
    "  should disable the submit control while the call is in flight and only retry\n" #
    "  after a confirmed failure.\n" #
    "- **Errors:** none are raised by the backend for well-formed input; empty strings\n" #
    "  are accepted and stored as-is.\n\n" #
    "### `listInquiries() : async [Inquiry]`\n\n" #
    "Returns every submitted quote request.\n\n" #
    "- **Authentication:** admin only. The caller must be a signed-in principal that\n" #
    "  holds the `#admin` role. Any other caller — anonymous, guest, or signed-in\n" #
    "  non-admin — receives a trap with the message `Unauthorized: admin only`.\n" #
    "- **Returns:** an array of `Inquiry` records (see below). Order is unspecified.\n" #
    "- **Read-only:** declared `query`, so it never mutates state.\n\n" #
    "### `schema() : async Text` and `execute(query : Text) : async Text`\n\n" #
    "Provided by the OQL `Expose` mixin. `schema()` returns the queryable schema and\n" #
    "`execute()` runs a JSON query against it. The `inquiry` entity is registered at\n" #
    "the `#controllerOnly` level, so only the platform controller (and the Data\n" #
    "Intelligence agent acting as controller) can read it; ordinary users cannot.\n\n" #
    "## Types\n\n" #
    "```\n" #
    "type InquiryInput = {\n" #
    "  name : Text;\n" #
    "  phone : Text;\n" #
    "  email : Text;\n" #
    "  service : Text;\n" #
    "  message : Text;\n" #
    "};\n\n" #
    "type Inquiry = {\n" #
    "  id : Nat;\n" #
    "  name : Text;\n" #
    "  phone : Text;\n" #
    "  email : Text;\n" #
    "  service : Text;\n" #
    "  message : Text;\n" #
    "  createdAt : Int;\n" #
    "};\n" #
    "```\n\n" #
    "- `id` — server-assigned identifier, unique per inquiry.\n" #
    "- `createdAt` — submission time as a Unix timestamp in **nanoseconds** (`Int`),\n" #
    "  taken from the canister clock. Divide by 1_000_000_000 for seconds.\n" #
    "- All other fields are free-form text exactly as the visitor entered them.\n\n" #
    "## Authentication and authorization\n\n" #
    "- **Anonymous callers** may call `submitInquiry` only. Every other method either\n" #
    "  requires the `#admin` role (`listInquiries`) or is controller-only (`schema`,\n" #
    "  `execute`).\n" #
    "- **Signed-in callers** are identified by their Internet Identity principal. The\n" #
    "  first authenticated principal to sign in through the app's frontend is\n" #
    "  automatically assigned the `#admin` role; subsequent sign-ins receive the\n" #
    "  `#user` role. Role assignment is handled by the authorization mixin.\n" #
    "- **Registration prerequisite:** access control is initialized lazily on first\n" #
    "  sign-in. A principal that has never signed in through this app's frontend is\n" #
    "  unregistered, even if it belongs to the app's owner. A direct API caller must\n" #
    "  sign in once (for example by calling `_initialize_access_control` as a\n" #
    "  signed-in caller) before any role-guarded call, including the guarded query\n" #
    "  `listInquiries`. An unregistered or anonymous caller hitting a guarded endpoint\n" #
    "  receives the trap `Unauthorized: admin only`.\n" #
    "- **Derivation origin:** the app's frontend pins an Internet Identity derivation\n" #
    "  origin, published at `/.well-known/ii-derivation-origin` when available. An\n" #
    "  agent already holding the user's Internet Identity authorization derives the\n" #
    "  correct per-app principal against that origin (for example\n" #
    "  `icp identity link web <name> --app <host>`). Such a delegation acts with the\n" #
    "  user's full authority in this app until it expires.\n\n" #
    "## Lifecycle and polling\n\n" #
    "- `submitInquiry` is a single update call; there is no asynchronous job to poll.\n" #
    "- `listInquiries` is a query and reflects committed state immediately after a\n" #
    "  successful `submitInquiry`.\n" #
    "- There is no deletion or update endpoint; inquiries are append-only.\n\n" #
    "## Limits and gotchas\n\n" #
    "- Inquiry ids are assigned from a single counter and are never reused.\n" #
    "- `createdAt` is canister time, not client time; do not trust a client-supplied\n" #
    "  timestamp.\n" #
    "- `listInquiries` returns the full set with no pagination; for large volumes use\n" #
    "  the OQL `execute` endpoint with filtering and pagination instead.\n";
  };
};
