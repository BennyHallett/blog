defmodule Bennyhallett.Mixfile do
  use Mix.Project

  def project do
    [app: :bennyhallett,
     version: "0.1.0",
     elixir: "~> 0.15.0",
     deps: deps]
  end

  def application do
    [applications: [:obelisk]]
  end

  defp deps do
    [{ :obelisk, "0.5.0" },
     { :yamerl, github: "yakaz/yamerl" }]
  end
end
