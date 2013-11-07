json.array!(@appointments) do |appointment|
  json.extract! appointment, :day, :month, :year, :time, :description
  json.url appointment_url(appointment, format: :json)
end
