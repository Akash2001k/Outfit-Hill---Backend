const Contact = require("../model/contactModel")

// ===================== Create Contact ==========================
exports.contact = async (req, res) => {
   try {

      const response = req.body;
      const message = await Contact.create(response)

      return res.status(200).json({
         message: message
      })

   } catch (error) {
      return res.status(500).json({
         error: "Message not delivered"
      })
   }
}

// ==================== Conatct List ================================

exports.contactList = async (req, res) => {
   try {
      let contacts = await Contact.find();

      if (contacts.length === 0) {
         res.status(404).json({ Message: "No Message Found" });
      } else {
         res.status(200).json(contacts);
      }
   } catch (error) {
      console.log(error);
   }
}

//===================== Delete Product ===============================
exports.deleteContact = async (req, res) => {
   try {
      let contact = Contact.findById(req.params.id)

      if (!contact) {
         return res.status(500).json({
            succuss: false,
            message: "contact not found"
         })
      }

      await contact.deleteOne()

      return res.status(201).json({msg:"Message is deleted"})

   } catch (error) {
      console.log(error)
   }
}