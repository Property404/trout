## Prefixture Properties

### abstract
**Type**: boolean  

**Description**:  
If true, a Fixture object is not created  
Used for inheritance

### elevation
**Type**: number

**Description**:  
The percentage of the object that's up in the air

### height
**Type**: number

**Description**:  
The height in pixels  
Currently only used for `ground` types

### inherit
**Type**: string

**Description**:  
Inherit properties from another (labeled) prefixture

### label
**Type**: string

**Description**:  
A label we use to refer to this specific fixture
in code

### scale
**Type**: number

**Description**:  
Size multiplier

### scalex
**Type**: number

**Description**:  
Horizontal size multiplier

### scaley
**Type**: number

**Description**:  
Vertical size multiplier

### src
**Type**: string

**Description**:  
Image source

### type
**Type**: string

**Description**:  
Prefixture type determines how the resulting
Fixture acts  
The default type is `stationary`

**Values**:  
`stationary` - Things you run into  
`ground` - The floor beneath your feet  
`movable` - Things that can be moved(currently broken)  
`passable` - Things that can be walked over  


### width
**Type**: number

**Description**:  
The width in pixels  
Currently only used for `ground` types

### x
**Type**: number

**Description**:  
The X position in pixels

### y
**Type**: number

**Description**:  
The Y position in pixels
