defmodule ChatBeWeb.ChatChannel do
  use ChatBeWeb, :channel

  def join("chat:lobby", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("send_message", payload, socket) do
    broadcast socket, "handle_message", payload
    {:noreply, socket}
  end
end