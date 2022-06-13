public with sharing class searchRelatedContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContacts(string recordID, string skey)
    {
        List<Contact> contactList = [select id, name,firstName,lastName, phone, email, account.Name from contact where (firstName like :skey OR lastName like :skey OR Email like :skey OR Phone like :skey) AND AccountId=:recordID limit 20];


        return contactList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContactData(string recordID){       
        
        List<Contact> contactList = [Select id, Name, FirstName, LastName, Phone, email, Account.Name From Contact Where AccountId=:recordID limit 20];
        return contactList;
    }

    @AuraEnabled(cacheable = true)
    public static List<Contact> returnCon(string keyVal)
    {

        List<Contact> contactList = [Select id, Name, FirstName, LastName, Phone, email, Account.Name From Contact Where id=:keyVal limit 20];
            return contactList;
        }
    }
