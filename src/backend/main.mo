import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import Map "mo:core/Map";
import InquiriesApi "mixins/inquiries-api";
import ApiDocMixin "mixins/api-doc";
import Types "types/inquiries";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let inquiries : Map.Map<Nat, Types.Inquiry>;
  let nextId : { var value : Nat };

  include MixinAuthorization(accessControlState, null);
  include InquiriesApi(accessControlState, inquiries, nextId);
  include ApiDocMixin();
  include Expose({
    entities = [
      inquiries.toEntity("inquiry", "Inquiry", "id")
        .sample({
          id = 0;
          name = "";
          phone = "";
          email = "";
          service = "";
          message = "";
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
