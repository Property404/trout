<a name="PlayerScene"></a>

## PlayerScene
Represents a regular trout scene  
where the player can move around and crap

This does not include UI/game over/etc scenes

**Kind**: global class  

* [PlayerScene](#PlayerScene)
    * [.prefixtures](#PlayerScene+prefixtures)
    * [.player_fixture](#PlayerScene+player_fixture)
    * [.setLoopInterval(interval)](#PlayerScene+setLoopInterval)
    * [.getLoopInterval()](#PlayerScene+getLoopInterval) ⇒ <code>integer</code>
    * [.addInteraction(label, action)](#PlayerScene+addInteraction)
    * [.getFixture(label)](#PlayerScene+getFixture) ⇒ <code>Fixture</code>

<a name="PlayerScene+prefixtures"></a>

### playerScene.prefixtures
Fixtures are any objects that belong to the scene  

Prefixtures are the descriptive objects used
to create Fixtures

**Kind**: instance property of [<code>PlayerScene</code>](#PlayerScene)  
<a name="PlayerScene+player_fixture"></a>

### playerScene.player\_fixture
Fixture object wrapping the player

**Kind**: instance property of [<code>PlayerScene</code>](#PlayerScene)  
<a name="PlayerScene+setLoopInterval"></a>

### playerScene.setLoopInterval(interval)
Set how often loop() is called

**Kind**: instance method of [<code>PlayerScene</code>](#PlayerScene)  

| Param | Type | Description |
| --- | --- | --- |
| interval | <code>integer</code> | The interval in milliseconds |

<a name="PlayerScene+getLoopInterval"></a>

### playerScene.getLoopInterval() ⇒ <code>integer</code>
See often loop() is called

**Kind**: instance method of [<code>PlayerScene</code>](#PlayerScene)  
**Returns**: <code>integer</code> - - the interval in milliseconds  
<a name="PlayerScene+addInteraction"></a>

### playerScene.addInteraction(label, action)
Bind callbacks to particular prefixtures w/label  
To be executed when user presses space or enter
or something like that near the fixture

**Kind**: instance method of [<code>PlayerScene</code>](#PlayerScene)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The Fixture label |
| action | <code>function</code> | The action to be used upon interaction |

<a name="PlayerScene+getFixture"></a>

### playerScene.getFixture(label) ⇒ <code>Fixture</code>
Get Fixture by label

**Kind**: instance method of [<code>PlayerScene</code>](#PlayerScene)  
**Returns**: <code>Fixture</code> - - The Fixture  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | The Fixture label |

