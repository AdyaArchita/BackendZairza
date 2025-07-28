**Basic Usage of Mongoose:-**

###  🔗 *Connecting to MongoDB*

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));
```
 Mongoose manages connection pooling, reconnection logic, and configuration options under the hood.

###   📐 *Defining a Schema*
    A *schema* is the blueprint of your documents. It defines field types, validators, default values, and more.

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

###   🧱 *Creating a Model*
    A *model* is a constructor compiled from the schema. It provides methods for creating, querying, updating, and deleting documents.

```js
const User = mongoose.model('User', userSchema);
```

###  ✍️ *CRUD Operations with Mongoose*

1. ➕ Create

```js
const newUser = new User({ name: 'Alice', email: 'alice@example.com', age: 25 });

newUser.save()
  .then(user => console.log('User saved:', user))
  .catch(err => console.error('Error saving user:', err));
```
Or, more concisely:

```js
await User.create({ name: 'Bob', email: 'bob@example.com' });
```

2. 📥 Read

```js
User.find({ age: { $gte: 18 } }) // Find all users aged 18 or older
  .then(users => console.log(users))
  .catch(err => console.error('Error finding users:', err));
```
Or, more concisely:

```js
const users = await User.find(); // Find all users

const user = await User.findOne({ email: 'alice@example.com' }); // Find one by condition

const userById = await User.findById('60f89b50a74d2e5efc5a1e33'); // Find by ID
```

3. 🔁 Update

```js
User.updateOne({ email: 'john.doe@example.com' }, { $set: { age: 26 } })
  .then(() => console.log('User updated!'))
  .catch(err => console.error('Error updating user:', err));
```
Or, more concisely:

```js
await User.updateOne({ email: 'alice@example.com' }, { age: 26 });

// Or find and update with return
const updatedUser = await User.findOneAndUpdate(
  { name: 'Bob' },{ age: 30 },{ new: true });
```

4. ❌ Delete

```js
User.deleteOne({ email: 'john.doe@example.com' })
  .then(() => console.log('User deleted!'))
  .catch(err => console.error('Error deleting user:', err));
```
Or, more concisely:

```js
await User.deleteOne({ email: 'alice@example.com' });

await User.findByIdAndDelete('60f89b50a74d2e5efc5a1e33'); // Or find and delete
```
### ✅ **Advanced Mongoose Features**

  1. 🔄 *Middleware (Hooks)* - Run logic before/after certain operations (e.g., saving, removing):

        ```js
      userSchema.pre('save', function(next) {
      console.log(`Saving user: ${this.name}`);
      next();// Proceed with saving
      });
        ```

  2. 🔗 *Virtuals* - Fields not stored in the database but computed on the fly:

      ```js
      userSchema.virtual('info').get(function() {
      return `${this.name} (${this.age} yrs old)`;
      });
      ```

  3. 🔍 *Population (Relationships)* - Simulate joins by referencing other documents:

      ```js
      const postSchema = new mongoose.Schema({
      title: String,
      content: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
      });

      const Post = mongoose.model('Post', postSchema);

      const posts = await Post.find().populate('author');
      ```

  4. 🧪 *Schema Validation* - Mongoose allows to enforce validation rules when creating documents. You can use built-in validators (e.g.- `required`, `unique`, `min`, `max`) or write custom validation logic. 

      ```js
      const productSchema = new mongoose.Schema({
      price: {
      type: Number,
      min: [0, 'Price cannot be negative'],
      required: true
      }
      });
      ```

  *Custom validation:*

      ```js
      email: {
      type: String,
      validate: {
      validator: v => v.includes('@'),
      message: props => `${props.value} is not a valid email!`
      }
      }
      ```