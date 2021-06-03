# The Humber Programmer Node Services

Simple Node microservices that helps demonstrate the capabilities
of kubernetes, written in Typescript with Express server


# Services

There are 3 main services, each with 2 versions
- Write
- Time
- Random

All services requires the environment variables:

| ENV VAR | Description |
| CONFIG_PATH | path to `config.yaml` which is a yaml configuration file for every app. content varies |
| ENV | the environment, either `DEV` or `PROD`. in `PROD` secrets will be omitted from responses and logs.

All requests are HTTP GET requests, for `curl` friendly-ness


## Write
`Write` is a database-like service that allows uses to read and write key-pair values to the container's 
`data/data.json` file. This mainly is use demonstrate how volumes work.

#### v1

Configuration File: `config.yaml`

```yaml
logs: debug # logging level. can be debug, info, error
secret_key_path: secret_file.txt # path to the secret
```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /write/:key/:value | Write to `key` with `val` |
| /read/:key  | `Read` from `key` |


#### V2 
Configuration File: `config.yaml`

```yaml
logs: debug # logging level. can be debug, info, error
secret_key_path: secret_file.txt # path to the secret
```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /write/:key/:value | Write to `key` with `val` |
|  /read/:key  | `Read` from `key` |
|  /all    | Reads the whole database |
|  /error  | Fails the service spectacularly | 


## Random
`Random` is a service that generates random values

#### V1 
Configuration File: `config.yaml`

```yaml
logs: debug # logging level. can be debug, info, error
secret_key_path: secret_file.txt # path to the file that contains the secret
random_range: # random of the random integer generated
  start: -1000000000 # the lower bound of the random generation
  end: 1000000000 # the upper bound of the random generation
```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /random | Genreates a random integer `int` |

#### V2
Configuration File: `config.yaml`

```yaml
logs: debug # logging level. can be debug, info, error
secret_key_path: secret_file.txt # path to file that contains secret
random_settings:
  int: # limits when generating ints
    start: -1000000000 # lower bound when generating integers
    end: 1000000000 # upper bound when generating integers
  float: # limits when generating floats
    start: -1000000000  # lower bound when generating floats
    end: 1000000000 # upper bound when generating float
  word: # configuration when generate words
    number: 3 # number of words to generate
    format: kebab # the format of the words. can be "kebab" | "camel" | "sentence" | "lower" | "title"

```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /random | Genreates a random integer `int`, random float `float` and a random string consisting of `x` number of words |
|  /error  | Fails the service spectacularly | 

## Time

`time` is a service that tells you the current time in various timezones 

#### v1
Configuration File: `config.yaml`

```yaml
logs: debug 
secret_key_path: secret_file.txt
format: "ddd, MMM Do YY, h:mm:ssa zz" # moment format of the time to use
```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /now/:timezone | Shows the current time in the specified `timezone`. `timezone` is the IANA identifier string |

#### v2
Configuration File: `config.yaml`

```yaml
logs: debug 
secret_key_path: secret_file.txt
format: "ddd, MMM Do YY, h:mm:ssa zz" # moment format of the time to use
```

| Endpoint | Description |  
| ---- | ---- |
|  /   | Status page to show metadata of the service |
|  /now/:timezone?format=:format | Shows the current time in the specified `timezone`. `timezone` is the IANA identifier string. Optiaonal query string `format` that allows you to override the displayed format |
|  /error  | Fails the service spectacularly | 
