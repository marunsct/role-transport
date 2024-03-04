using role.transport as my from '../db/data-model';

service TransportService
//@(restrict: [
//    { grant: 'WRITE', to: 'TR_Operator' } ])
 {


    entity Nodes           as projection on my.Nodes;

    entity Route           as projection on my.Route;
    
    entity Routes          as projection on my.Routes;
    
    entity Transports      as projection on my.Transports;
    
    entity Transports_Logs as projection on my.Transports_Logs;

    entity  Destination as projection on my.Destination;
    
}
