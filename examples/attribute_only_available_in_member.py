from dataclasses import dataclass
@dataclass
class Circle:
   radius: float

   @property
   def area(self) -> float:
      return pi * self.radius**2

class Container:
   def __init__(self, inner: Circle) -> None:
      self.inner = inner

circle = Circle(radius=4.0)
container = Container(circle)
print(container.area)