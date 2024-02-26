using { sap.capire.incidents as my } from '../db/schema';
@(restrict: [
    { grant: 'WRITE', to: 'operator', where: '$user.level > 1' } ])
service ProcessorService { 
    entity Incidents as projection on my.Incidents;

    @readonly 
   @(requires: 'support')
    entity Customers as projection on my.Customers;
}

extend projection ProcessorService.Customers with {
  firstName || ' ' || lastName as name: String
}

annotate ProcessorService.Incidents with @odata.draft.enabled;
// @(requires: 'support')