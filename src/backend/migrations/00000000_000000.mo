import AccessControl "mo:caffeineai-authorization/access-control";
import Map "mo:core/Map";

module {
  type OldActor = {};

  type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    service : Text;
    message : Text;
    createdAt : Int;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    inquiries : Map.Map<Nat, Inquiry>;
    nextId : { var value : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      inquiries = Map.empty();
      nextId = { var value = 0 };
    };
  };
};
