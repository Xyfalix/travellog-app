import { Component } from "react";
import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  // The object passed to setState is merged with the current state object
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const token = await signUp(this.state);
      console.log(`token is ${token}`);
      localStorage.setItem("token", token);
      this.props.setUser({ name: this.state.name, email: this.state.email });
    } catch (error) {
      this.setState({
        error: "Something went wrong",
      });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container bg-neutral-400 mx-auto max-w-md p-5 rounded border">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label className="text-m my-2 text-gray-700 font-serif">
                Name
              </label>
              <input
                className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="text-m my-2 text-gray-700 font-serif">
                Email
              </label>
              <input
                className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="text-m my-2 text-gray-700 font-serif">
                Password
              </label>
              <input
                className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="text-m my-2 text-gray-700 font-serif">
                Confirm
              </label>
              <input
                className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-accent my-2"
              disabled={disable}
            >
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
