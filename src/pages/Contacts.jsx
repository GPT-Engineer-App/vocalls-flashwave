import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1 234 567 8901' },
    { id: 2, name: 'Jane Smith', phone: '+1 987 654 3210' },
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const { toast } = useToast();

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ name: '', phone: '' });
      toast({
        title: "Contact Added",
        description: `${newContact.name} has been added to your contacts.`,
      });
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "The contact has been removed from your list.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>
      <div className="mb-6 flex space-x-2">
        <Input
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <Button onClick={addContact}>
          <Plus className="mr-2" /> Add Contact
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
            <p className="text-gray-600 mb-4">{contact.phone}</p>
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <Phone className="mr-2" /> Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="mr-2" /> Video
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteContact(contact.id)}>
                <Trash2 className="mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
