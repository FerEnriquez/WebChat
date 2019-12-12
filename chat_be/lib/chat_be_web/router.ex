defmodule ChatBeWeb.Router do
  use ChatBeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ChatBeWeb do
    pipe_through :api
  end
end
