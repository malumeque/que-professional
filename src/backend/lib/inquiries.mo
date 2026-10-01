import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Types "../types/inquiries";

module {
  /// Persist a new quote request and return its assigned id.
  public func submitInquiry(
    inquiries : Map.Map<Nat, Types.Inquiry>,
    nextId : { var value : Nat },
    input : Types.InquiryInput,
  ) : Nat {
    let id = nextId.value;
    nextId.value := id + 1;
    inquiries.add(id, {
      id;
      name = input.name;
      phone = input.phone;
      email = input.email;
      service = input.service;
      message = input.message;
      createdAt = Time.now();
    });
    id;
  };

  /// Return every submitted quote request, newest first.
  public func listInquiries(inquiries : Map.Map<Nat, Types.Inquiry>) : [Types.Inquiry] {
    inquiries.values().toArray().sort(func(a, b) = Nat.compare(b.id, a.id));
  };
};
