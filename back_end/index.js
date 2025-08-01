const mongoose = require('mongoose');

//disable strict mode 
mongoose.set('strictQuery', false);
//connect to mongodb and create new database if it does not exist
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'nancy',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database successfully'));

//Create layout of your data tables. Means create schema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        required: true,
    },
});

const SolutionSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true,
    },

    solution: {
        type: String,
        required: true,
    },
    solutionBy: {
        type: String,
        required: true,
    },
  }, { timestamps: true });
    

 
  
    

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  
  },
  subject: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  questionBy: {
    type: String,
    required: true,
  }
}, { timestamps: true });




const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

});

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    adyear: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

});


//create collections(if do not exist) admindata and logindata in database nancy
const AdminData = mongoose.model('admindata', AdminSchema);
AdminData.createIndexes();

const StudentData = mongoose.model('studentdata', StudentSchema);
StudentData.createIndexes();

const LoginData = mongoose.model('logindata', LoginSchema);
LoginData.createIndexes();

const QuestionData = mongoose.model('questiondata', QuestionSchema);
QuestionData.createIndexes();


const SolutionData = mongoose.model('solutiondata',SolutionSchema );
SolutionData.createIndexes();

//Create middle-ware service and define settings for connectivity
const express = require('express');
const session = require('express-session'); 
const cookieParser = require('cookie-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');

// Create app
const app = express();
console.log("Service started at http://localhost:5000");



// Middleware setup
app.use(cookieParser());



app.use(cors({
  origin: "http://localhost:3000", // React app ka origin
  credentials: true
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.use(session({
  secret: "your_secret_key", // change to a secure secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true if using HTTPS
    httpOnly: true,
    sameSite: "lax" // or 'none' if using HTTPS cross-site
  }
}));



//create API
app.get('/', (req, res) => {
    res.status(200).json(
        {
            "Msg": "This is my first page."
        }
    )
});

//check email and password
app.post("/check_login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await LoginData.findOne({ email });
       

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }


        req.session.isLoggedIn = true;
        req.session.email = user.email;
       
        req.session.usertype = user.usertype;
       
        console.log("Login success, sending user:", user);
        console.log("Session after login:", req.session);


        res.json({
            email: user.email,
            usertype: user.usertype,
            name: user.name,
            address: user.address,
            contact: user.contact
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
        console.log("helo");
    }
});




//..
app.get("/isUser", async (req, res) => {
    try {
        console.log("isUser : Hello1");
        if (req.session.isLoggedIn === true) {
            console.log("isUser : Hello2");
            if (req.session.usertype === "admin") {
                console.log("isUser : Hello3");
                const admin = await AdminData.findOne({ email: req.session.email });
                req.session.name = admin.name;
                req.session.address = admin.address;
                req.session.contact = admin.contact;
                console.log("The admin is :",admin);
          
                res.json({
                    usertype: "admin",
                    email: admin.email,
                    name: admin.name,
                    address: admin.address,
                    contact: admin.contact
                });
            }
            else if(req.session.usertype === "student")
                {
                    console.log("isUser : Hello4");
                    const student=await StudentData.findOne({ email: req.session.email });
                    req.session.name = student.name;
                    req.session.enrollment = student.enrollment;
                    req.session.course = student.course;
                    req.session.adyear = student.adyear;
                    req.session.address = student.address;
                    req.session.contact = student.contact;
                    console.log(student);
                    res.json({
                        usertype: "student",
                        email: student.email,
                        name: student.name,
                        enrollment: student.enrollment,
                        course: student.course,
                        adyear: student.adyear,
                        address: student.address,
                        contact: student.contact

                    });

            }
        } else {
            res.json({
                usertype: "nouser"
            });
        }
    } catch (e) {
        console.log("Error: server error");
        console.log(e);
        res.status(500).json({ error: "Server error" });
    }
});



//logout
app.get("/logout", async (req, res) => {
    session.isLoggedIn = false;
    session.email = "";
    session.usertype = ""
    res.json({
        "msg": "success"
    });
});



 

app.post('/change_admin_password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        
        const admin = await LoginData.findOne({ email });

        
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        
        if (admin.password !== oldPassword) {
            return res.status(401).json({ error: "Old password is incorrect" });
        }

        
        await LoginData.findOneAndUpdate({ email }, { password: newPassword });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error in /change_admin_password:", err);
        res.status(500).json({ error: "Server error" });
    }
});



app.put("/updateAdminProfile", async (req, res) => {
    const { name, address, contact, email } = req.body;
  
    try {
      const result = await AdminData.updateOne(
        { email: email },
        { $set: { name, address, contact } }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "No update made." });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ success: false, error: "Server error." });
    }
  });
  

  app.put("/updateStudentProfile", async (req, res) => {
    const { name, enrollment, course, adyear, address, contact, email } = req.body;
  
    try {
      const result = await StudentData.updateOne(
        { email: email },
        { $set: { name, enrollment, course, adyear, address, contact } }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "No update made." });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ success: false, error: "Server error." });
    }
  });






//fetch data
app.get("/admins", async (req, res) => {
    console.log("Request Received");
    try {
        const st = await AdminData.find();
        console.log(st);
        res.status(200).json(st);
    } catch (e) {
        console.log("Error:Problem");
        console.log(e);
        res.status(500).json({ error: 'server error' });

    }
});

app.post("/save_admins", async (req, res) => {
    try {
        const { name, address, contact, email, password } = req.body;
        const usertype = "admin";

        console.log(name, address, contact, email, password);

        const ad1 = new AdminData({ name, address, contact, email });
        const lgn = new LoginData({ email, password, usertype });

        const adminResult = await ad1.save();
        const loginResult = await lgn.save();

        res.status(200).json({ message: "Data saved successfully" });

    } catch (e) {
        console.error("Error saving admin:", e);
        res.status(500).json({ error: "Something went wrong - try again" });

    }
});


app.get("/show_admins", async (req, res) => {
    try {
        let data = await AdminData.find();
        res.json(data);
        console.log(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
});



//Edit data 
app.post("/update_admin", async (req, res) => {
    try {
        const nm = req.body.name;
        const adr = req.body.address;
        const mobile = req.body.contact;
        const em = req.body.email;

        const filter = { email: em };
        const update = { name: nm, address: adr, contact: mobile };

        const result = await AdminData.findOneAndUpdate(filter, update, { new: true });
        console.log(result);
        res.json({
            data: 'success',
            msg: 'Data saved successfully'
        });

    } catch (e) {
        console.log(e);
        res.json({
            data: 'error',
            msg: 'Cannot save changes'
        });

    }
});

//
app.post("/get_admin", async (req, res) => {
    try {
        const em = req.body.id;
        console.log(em);
        const admins = await AdminData.findOne({ email: em });
        console.log(admins);
        res.json(admins);
    } catch (e) {
        console.log("Error: Problem", e);
        res.status(500).json({ error: 'server error' });
    }
});

//Delete 
app.post("/get1_admin", async (req, res) => {
    try {
        const em = req.body.id;
        console.log(em);
        const admins = await AdminData.findOne({ email: em });
        console.log(admins);
        res.json(admins);
    } catch (e) {
        console.log("Error: Problem", e);
        res.status(500).json({ error: 'server error' });
    }
});

//Delete data

app.post("/delete_admin", async (req, res) => {

    try {
        const em = req.body.email;

        const filter = {
            email: em
        };

        const result = await AdminData.findOneAndDelete(filter);
        console.log(filter);
        if (result) {
            res.json({
                data: 'success',
                msg: 'Admin data deleted successfully'


            });
            console.log("result");
        } else {
            res.json({
                data: 'not_found',
                msg: 'Admin not found'
            });
            console.log("no result");
        }
    } catch (e) {
        console.log(e);
        res.json({
            data: 'error',
            msg: 'Cannot delete'
        });
    }
});


//fetch data
app.get("/students", async (req, res) => {
    console.log("Request Received")

    try {
        const sd = await StudentData.find();
        console.log(sd);
        res.status(200).json(sd);
    } catch (e) {
        console.log("Error:Problem");
        console.log(e);
        res.status(500).json({ error: 'server error' });
    }

});

app.post("/save_students", async (req, res) => {
    try {
        const { name, enrollment, course, adyear, address, contact, email, password } = req.body;
        const usertype = "student";

        console.log(name, enrollment, course, adyear, address, contact, email, password);

        const ad2 = new StudentData({ name, enrollment, course, adyear, address, contact, email, password });
        const lgn = new LoginData({ email, password, usertype });

        const studentResult = await ad2.save();
        const loginResult = await lgn.save();

        res.status(200).json({ message: 'Data Saved Successfully' });

    } catch (e) {
        console.error("Error saving student", e);
        res.status(500).json({ error: 'something went wrong-try again' });

    }
});

app.get("/show_students", async (req, res) => {
    try {
        let data = await StudentData.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.post("/update_student", async (req, res) => {
    try {
        const nm = req.body.name;
        const enr = req.body.enrollment;
        const cur = req.body.course;
        const ady = req.body.adyear;
        const adr = req.body.address;
        const mobile = req.body.contact;
        const em = req.body.email;

        const filter = { email: em };
        const update = { name: nm, enrollment: enr, course: cur, adyear: ady, address: adr, contact: mobile };

        const result = await StudentData.findOneAndUpdate(filter, update, { new: true });
        console.log(result);
        res.json({
            data: 'success',
            msg: 'Data saved successfully'
        });

    } catch (e) {
        console.log(e);
        res.json({
            data: 'error',
            msg: 'Cannot save changes'
        });

    }
});

//
app.post("/get_student", async (req, res) => {
    try {
        const em = req.body.id;
        console.log(em);
        const students = await StudentData.findOne({ email: em });
        console.log(students);
        res.json(students);
    } catch (e) {
        console.log("Error: Problem", e);
        res.status(500).json({ error: 'server error' });
    }
});

//Delete 
app.post("/get1_student", async (req, res) => {
    try {
        const em = req.body.id;
        console.log(em);
        const students = await StudentData.findOne({ email: em });
        console.log(students);
        res.json(students);
    } catch (e) {
        console.log("Error: Problem", e);
        res.status(500).json({ error: 'server error' });
    }
});

//Delete data

app.post("/delete_student", async (req, res) => {

    try {
        const em = req.body.email;

        const filter = {
            email: em
        };

        const result = await StudentData.findOneAndDelete(filter);
        console.log(filter);
        if (result) {
            res.json({
                data: 'success',
                msg: ' Student data deleted successfully'


            });
            console.log("result");
        } else {
            res.json({
                data: 'not_found',
                msg: 'Student not found'
            });
            console.log("no result");
        }
    } catch (e) {
        console.log(e);
        res.json({
            data: 'error',
            msg: 'Cannot delete'
        });
    }
});

//fetch data
app.get("/uploadq", async (req, res) => {
    console.log("Request Received");
    try {
        const st = await QuestionData.find();
        console.log(st);
        res.status(200).json(st);
    } catch (e) {
        console.log("Error:Problem");
        console.log(e);
        res.status(500).json({ error: 'server error' });

    }
});


app.post("/save_question", async (req, res) => {
  try {
    console.log("Save question : ", req.session.email, req.session.isLoggedIn, req.session.usertype);

    if (req.session.isLoggedIn === true) {
      const subject = req.body.subject;
      const question = req.body.question;
      const questionBy = req.session.email;

      const questionId = uuidv4(); // Generate unique ID

      const newQuestion = new QuestionData({
        questionId,
        subject,
        question,
        questionBy,
      });

      await newQuestion.save();

      console.log("Question saved for:", questionBy);
      res.status(200).json({ message: "Question saved successfully" });
    } else {
      res.status(401).json({ error: "Not logged in" });
    }
  } catch (e) {
    console.error("Error saving question:", e);
    res.status(500).json({ error: "Something went wrong - try again" });
  }
});

app.get('/show_question', async (req, res) => {
  try {
    const questions = await QuestionData.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/update_question/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;
    const { subject, question } = req.body;

    const updated = await QuestionData.findOneAndUpdate(
      { questionId },
      { subject, question },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully' });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});



app.delete("/delete_question/:questionId", async (req, res) => {
  try {
    const deleted = await QuestionData.findOneAndDelete({ questionId: req.params.questionId });
    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
});



app.get("/show_my_questions", async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const email = req.session.email;
      const myQuestions = await QuestionData.find({ questionBy: email }).sort({ createdAt: -1 });
      res.status(200).json(myQuestions);
    } else {
      res.status(401).json({ error: "Not logged in" });
    }
  } catch (err) {
    console.error("Error fetching user's questions:", err);
    res.status(500).json({ error: "Failed to fetch user's questions" });
  }
});


app.delete("/delete_my_question/:questionId", async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const email = req.session.email;
      const deleted = await QuestionData.findOneAndDelete({
        questionId: req.params.questionId,
        questionBy: email,
      });

      if (!deleted) {
        return res.status(403).json({ error: "Unauthorized or question not found" });
      }

      res.status(200).json({ message: "Question deleted successfully" });
    } else {
      res.status(401).json({ error: "Not logged in" });
    }
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

app.put("/update_my_question/:questionId", async (req, res) => {
  try {
    if (req.session.isLoggedIn === true) {
      const email = req.session.email;
      const updated = await QuestionData.findOneAndUpdate(
        { questionId: req.params.questionId, questionBy: email },
        {
          subject: req.body.subject,
          question: req.body.question,
        },
        { new: true }
      );

      if (!updated) {
        return res.status(403).json({ error: "Unauthorized or question not found" });
      }

      res.status(200).json({ message: "Question updated successfully" });
    } else {
      res.status(401).json({ error: "Not logged in" });
    }
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
});


app.get("/get_question/:id", async (req, res) => {
  try {
    const question = await QuestionData.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ message: "Server error" });
  }
});





const { v4: uuidv4 } = require("uuid");

app.put("/upload_solution/:id", async (req, res) => {
  try {
    console.log("Current session:", req.session);
    if (req.session.isLoggedIn === true) {
      const questionDoc = await QuestionData.findById(req.params.id);
      if (!questionDoc) return res.status(404).json({ message: "Question not found" });

      const solutionBy = req.session?.email || "anonymous";

      const updatedSolution = await SolutionData.findOneAndUpdate(
        { questionId: questionDoc.questionId },
        {
          solution: req.body.solution,
          solutionBy,
          questionId: questionDoc.questionId,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({
        message: "Solution saved",
        solution: updatedSolution.solution,
        solutionBy: updatedSolution.solutionBy,
        updatedAt: updatedSolution.updatedAt,
      });
    } else {
      res.status(401).json({ message: "Unauthorized: Please login" });
    }
  } catch (err) {
    console.error("Error saving solution:", err);
    res.status(500).json({ message: "Server error" });
  }
});






app.get('/show_solutions', async (req, res) => {
  try {
    const solutions = await SolutionData.find({ solution: { $ne: "" } })
      .sort({ createdAt: -1 });
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});














  


//start server
app.listen(5000);
console.log("Server stated : http://localhost:5000/");
