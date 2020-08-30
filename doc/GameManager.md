<a name="GameManager"></a>

## GameManager
Wrapper around Phaser.Game  
Acts as scene manager, and takes on other global responsibilities

**Kind**: global class  

* [GameManager](#GameManager)
    * [.registerScene(scene)](#GameManager+registerScene)
    * [.setPrimaryScene(scene_name)](#GameManager+setPrimaryScene)
    * [.onFinishLoading(callback)](#GameManager+onFinishLoading)
    * [.finishLoading()](#GameManager+finishLoading)

<a name="GameManager+registerScene"></a>

### gameManager.registerScene(scene)
Register a scene  
This should be done for any dynamically loaded scene

**Kind**: instance method of [<code>GameManager</code>](#GameManager)  

| Param | Type | Description |
| --- | --- | --- |
| scene | <code>TroutScene</code> | The scene to be registered |

<a name="GameManager+setPrimaryScene"></a>

### gameManager.setPrimaryScene(scene_name)
Change the current primary scene

**Kind**: instance method of [<code>GameManager</code>](#GameManager)  

| Param | Type | Description |
| --- | --- | --- |
| scene_name | <code>TroutScene</code> | The scene to be used |

<a name="GameManager+onFinishLoading"></a>

### gameManager.onFinishLoading(callback)
Set a callback to be called when we finish loading the first scene

**Kind**: instance method of [<code>GameManager</code>](#GameManager)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>onFinishLoading</code> | The callback to be used |

<a name="GameManager+finishLoading"></a>

### gameManager.finishLoading()
Notify game manager that we finished loading and that we should use a
callback if one has previouly been provided

**Kind**: instance method of [<code>GameManager</code>](#GameManager)  
