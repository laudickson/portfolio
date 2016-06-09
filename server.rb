require 'sinatra'
require 'haml'

use Rack::Deflater

get '/' do
  redirect '/home'
end

get '/home' do
  haml :home
end
