module {
  /// A quote request submitted by a prospective customer.
  public type Inquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    service : Text;
    message : Text;
    createdAt : Int;
  };

  /// The fields a visitor supplies when submitting a quote request.
  public type InquiryInput = {
    name : Text;
    phone : Text;
    email : Text;
    service : Text;
    message : Text;
  };
};
