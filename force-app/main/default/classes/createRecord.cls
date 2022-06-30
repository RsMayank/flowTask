public with sharing class createRecord {
 
    @AuraEnabled
    public static Opportunity createOpp(Opportunity op) {
        system.debug('acc'+op);
        insert op;
        return op;
    }
}
