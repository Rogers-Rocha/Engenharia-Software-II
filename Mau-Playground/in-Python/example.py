
class EventHandler:
	def __init__(self, event: callable):
		self.event = event # <---Injection

	def trigger(self, *args, **params):
		return self.event(*args, **params)

class Button:
	def __init__(self, name: str, event_handler: EventHandler):
		self.name = name # <---Injection
		self.event_handler = event_handler # <---Injection
	
	def press(self, *args, **params):
		return self.event_handler.trigger(*args, **params)

def render(button: Button): # <---Injection
	print(button.name)
	a, b = map(lambda x: int(x), input("Entrada: ").split(" "))
	print(button.press(a, b))


if __name__ == "__main__":
	render(
		button=Button( # <---Assembly
			name="SOMAR", # <---Assembly
			event_handler=EventHandler( # <---Assembly
				event=lambda x, y: x+y # <---Assembly
			)
		)
	)
