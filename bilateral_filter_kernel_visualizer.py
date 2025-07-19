import math
import random
import numpy as np
from perlin_numpy import generate_perlin_noise_2d;
from dataclasses import dataclass

# [TODO] USE PERLINE NOISE TO MAKE PIXEL INTENSITY WINDOW EXAMPLE MORE ACCURATE

def spatialKernel(x, y, xo, yo, sigma):
  sigma2 = 2 * sigma * sigma
  return math.exp( -((x - xo)**2 + (y - yo)**2) / sigma2)

def spatialKernelConstructor(size, sigma):
  sigma2 = 2 * sigma * sigma
  gaussiankernel = [get1DGaussian(i, 0, sigma) for i in range(-KERNEL_HS, KERNEL_HS, 1)]
  

def rangeKernel(i, io, sigma):
  sigma2 = 2 * sigma * sigma
  return math.exp( - ((i - io)**2) / sigma2)

def get1DGaussian(q, p, sigma):
  sigma2 = 2 * sigma * sigma
  return math.exp( - ((q - p)**2) / sigma2)

def ansi_rgb(gradient):
  return f"\x1b[38;2;{gradient.r};{gradient.g};{gradient.b}m"

def map_to_value(start, end, scalar):
  return math.floor(scalar * (start - end) + end)
  
def normalize(start, end, value):
  return (value - end) / (start - end)

def map_rgb_values(rgb_list, normalized_value):
  for i in range(len(rgb_list)):
    if normalized_value <= rgb_list[i].start and normalized_value >= rgb_list[i].end:
      current_element = rgb_list[i]
      next_element = rgb_list[i + 1]
      normalized_scalar = normalize(current_element.start, current_element.end, normalized_value)
      return RGB(
        map_to_value(current_element.rgb.r, next_element.rgb.r, normalized_scalar),
        map_to_value(current_element.rgb.g, next_element.rgb.g, normalized_scalar),
        map_to_value(current_element.rgb.b, next_element.rgb.b, normalized_scalar)
      )

    i + 1

def colorize_output(matrix):
  most_characters = 0
  
  for column in matrix:
    for element in column:
      if (len(str(element)) > most_characters):
        most_characters = len(str(element))


  for column in matrix:
    for element in column:
      normalizedelement = element
      if (element > 1):
        normalizedelement = normalize(0, 255, element)
      print(f"{ansi_rgb(map_rgb_values(RGB_STEPS, normalizedelement))}{element}\x1b[0m{" " * (most_characters - len(str(element)) + 1)}", end='')
    print()

@dataclass
class RGB:
  r: int
  g: int
  b: int

@dataclass
class RGB_HELPER:
  rgb: RGB
  start: float
  end: float

RGB_STEPS = [
  RGB_HELPER(RGB(231, 18, 36), 1, 0.5),
  RGB_HELPER(RGB(254, 212, 48), 0.5, 0),
  RGB_HELPER(RGB(0, 105, 191), 0, 0),
]
KERNEL_SIZE = 13
KERNEL_HS = math.floor(KERNEL_SIZE / 2) # Kernel half size
SPATIAL_SIGMA = 3
RANGE_SIGMA = 20
pixel_window = [[math.floor(random.random() * 255) for i in range(KERNEL_SIZE)] for j in range(KERNEL_SIZE)]
spatial_kernel = [[round(spatialKernel(i, j, KERNEL_HS, KERNEL_HS, SPATIAL_SIGMA), 4) for i in range(KERNEL_SIZE)] for j in range(KERNEL_SIZE)]
range_kernel = [[round(rangeKernel(pixel_window[j][i], pixel_window[KERNEL_HS][KERNEL_HS], RANGE_SIGMA), 4) for i in range(KERNEL_SIZE)] for j in range(KERNEL_SIZE)]

print("SPATIAL KERNEL")
colorize_output(spatial_kernel)
print("PIXEL WINDOW (INTENSITY)")
colorize_output(pixel_window)
print("RANGE KERNEL")
colorize_output(range_kernel)
# for scalar in range(0, 11):
#   scalar *= 0.1
#   print(f"DEBUG TEST: \x1b{ansi_rgb((map_rgb_values(RGB_STEPS, scalar)))}TEST TEXT\x1b[0m")

# print(f"DEBUG TEST: {round(rangeKernel(27, 8, RANGE_SIGMA), 4)}")