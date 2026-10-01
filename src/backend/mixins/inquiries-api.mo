import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import Runtime "mo:core/Runtime";
import InquiriesLib "../lib/inquiries";
import Types "../types/inquiries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiries : Map.Map<Nat, Types.Inquiry>,
  nextId : { var value : Nat },
) {
  /// Submit a quote request. Open to any caller, including anonymous visitors.
  public shared func submitInquiry(input : Types.InquiryInput) : async Nat {
    InquiriesLib.submitInquiry(inquiries, nextId, input);
  };

  /// List all submitted quote requests. Admin only.
  public query ({ caller }) func listInquiries() : async [Types.Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: admin only");
    };
    InquiriesLib.listInquiries(inquiries);
  };
};
