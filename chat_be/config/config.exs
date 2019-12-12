# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :chat_be, ChatBeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "y1pAiYhnGPCQeMXgVcKyZbDdp0Q3FmYipBxi3tv9x6y6SdYCwPcG6d6w7nyiTC8P",
  render_errors: [view: ChatBeWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: ChatBe.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
