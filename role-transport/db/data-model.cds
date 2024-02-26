namespace role.transport;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity Nodes : cuid, managed {
  name                  : String;
  appliction_identifier : String;
  description           : String;
  destination : Association to Destination;
}

entity Routes : cuid, managed {
  description : String;
  route       : Association to many Route
                  on route.routes = $self;
}

entity Route : cuid, managed {
  description : String;
  source_node : Association to Nodes;
  target_node : Association to Nodes;
  routes      : Association to Routes;
}

entity Transports : cuid, managed {
  transport_number : Integer;
  description      : String;
  previous_node    : Association to Nodes;
  current_node     : Association to Nodes;
  next_node        : Association to Nodes;
  status           : Status;
  logs             : Association to many Transports_Logs
                       on logs.transport = $self;

}

entity Transports_Logs : cuid, managed {
  logs      : String;
  transport : Association to Transports;

}

entity Destination : cuid, managed {
  name : String;
  description: String;
  url: String;
  token_url : String;
  client_id : String;
  client_secret : String;  
}

type Status : String enum {
  Sucess;
  Error;
  Warning;
  Inprogress;
  New;
  Reprocessing;
};
