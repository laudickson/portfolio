require 'sass/plugin/rack'
require './server'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

# disable buffering for Heroku Logplex
$stdout.sync = true

run Sinatra::Application

configure :production do
  db = URI.parse(ENV['DATABASE_URL'] || 'postgres://localhost/blogdb')

  ActiveRecord::Base.establish_connection(
    :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end
