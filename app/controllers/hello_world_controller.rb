class HelloWorldController < ApplicationController
  around_filter :hypernova_render_support
  
  def index
    @hello_world_props = { name: "Hypernova" }
  end
end

