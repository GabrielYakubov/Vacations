export default {
  destination: {
    required: { value: true, message: "Missing destination" },
    minLength: { value: 2, message: "Name too short" },
    maxLength: { value: 50, message: "Name too long" },
  },
  description: {
    required: { value: true, message: "Missing description" },
    min: { value: 0, message: "description cannot be empty" },
    max: { value: 200, message: "description cant exceed 200 charecters" },
  },
  startDate: {
    required: { value: true, message: "Missing starting date" },
    min: { value: 0, message: "starting date cannot be empty" },
    // max: { value: 100, message: "price cant exceed 100" }
  },
  endDate: {
    required: { value: true, message: "Missing ending date" },
    min: { value: 0, message: "End date cannot be empty" },
    // max: { value: 100, message: "price cant exceed 100" }
  },
  price: {
    required: { value: true, message: "Missing price" },
    min: { value: 0, message: "price cant be negative" },
    max: { value: 10000, message: "price cant exceed 10000" },
  },
  image: {
    required: { value: true, message: "Missing image" },
  },
};
