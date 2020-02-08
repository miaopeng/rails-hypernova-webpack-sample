class HelloWorldController < ApplicationController
  around_action :hypernova_render_support
  
  def index
    @hello_world_props = { name: "Hypernova" }
  end
end

