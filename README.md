# Elastic Search Experiments

CLD Cloud Computing class - 2016  
HEIG-VD, Yverdon-les-Bains, Switzerland  
Authors: [Bafs](https://github.com/BafS), [D34D10CK](https://github.com/D34D10CK), [BinaryBrain](https://github.com/BinaryBrain), [ValentinMinder](https://github.com/ValentinMinder)

## Structure of the Project

The aim of this project is to have a first experience with Elastic Search.

We developped several ressources, including

- the current README is an outline of the topic
- the [summary](summary) of the topic
- the [presentation slides](slides.pdf) we used to present the project
- the [logstash configuration](logstash) for Demo 1 (Elastic)
- the [data source an uploader script](data-uploader) for Demo 2 (Kibana)
- a running instance of Elastic Search on AWS, with Kibana plugin. The direct link is not displayed here but available in the resources.

# Outline of Elastic Search Topic

## 1. How it works

*Goal of this chapter: Explain globally your topic. Recall that your audience consists of application architects, developers and testers, but also business people (your boss). Don't forget to discuss cost and strategic questions.*

### Diagram of the Architecture

- Real-time data gathering
- Abstraction and wrappers with logstatch (for transport and log parsing)

### Installation, Configuration and Usage

- Installation and configuration procedure (no demo)
- How to manage multiple servers

### Pros and cons

Pros:

- **RESTful** JSON API
- Fast deployement
- Aggregation
- Designed to be distributed
- **Query DSL syntax** is really flexible and easy to use
- Open source

Cons:

- **Installation** & configuration
- Still relatively **new project**, not a lot of documentations, maybe not very stable.
- **Security**: ElasticSearch does not provide any authentication or access control functionality.
- **Transactions**: There is no support for transactions or processing on data manipulation
- **Durability**: ES is distributed and fairly stable but backups and durability are not as high priority as in other data stores. This is probably the most important if you're going to make ES the primary store since losing your data is never good.

Reference: [Slant](http://www.slant.co/topics/95/viewpoints/5/~search-engines-for-web-applications~elasticsearch), [Quora](https://www.quora.com/Why-shouldnt-I-use-Elasticsearch-as-my-primary-datastore)

### Demo with real data

- Connect a server (Apache, nginx, database ...) that sends its data to the ELS
- Create some errors/logs (Chaosmonkey, db shutdown, wrong login, kill processes)
- Explore the logs to find the issues
- Show that the same ELS contains logs from multiple sourice

## 2. Search capacities and Proof-of-Concept

*Goal of this chapter: For the proof-of-concept choose a practical application that illustrates well your topic.*

### Query language

- queries type
- language type
- possible questions to ask

### Demo with simple data

- Demonstration with "easy-to-understand" data, not meaningless obsure logs
- Every attendee will understand and realize what data we're talking about
- Demonstration of the search capacities 
- Source of data: [Public transport stops](https://opendata.swiss/en/dataset/haltestellen-des-offentlichen-verkehrs)

## 3. Use Elastic Search as a service ? 

*Goal of this chapter: Give general recommendations when it makes sense to use the cloud service / technology and when it doesn't.*

Building a solution:

- option 1: à deployer soi-même en entreprise:  **ELK**: Elastic, Logstatch, Kibana = full stack solution
- option 2: use an ELS-as-a-service like Amazon or others.

To compare:

- option1 vs. option2: simplification ? advantages ? conditions ? constraints ? limitations ? capacities ?
- is diagnostic offered with Amazon service?
- how to connect my existing services (IT or Amazon) to Amazon ELS

### Amazon vs. ELK Full-stack

Pros Amazon (or generally other providers)

- All logs accessible in one place. 
- Hassle-free managed ELK you don’t need to maintain and scale
- Use built-in Kibana or use your own Kibana or Grafana with Logsene
- Nothing to install – use any log shipper you want
- price: pay-as-you-go and per-service (no IT & infrastructure, maintanance, etc)

Cons Amazon:

- version of Elasticsearch: not choosable 
- Elasticsearch 1.5.x and other versions have critical bugs
- less flexible with library support, the technology moves fast!
- limited choices in terms of VM characteristics: type, disk size, RAM)
- requires cloud usage (country and legal issues, technical issues with traffic/bandwidth)

Source: [Cloud Academy](http://cloudacademy.com/blog/amazon-elasticsearch-review/)

Cost of Amazon ELS: 

- instance: the cheapest is `t2.micro.elasticsearch` is from 0.021USD/h, that's 15.12USD/month.
- storage: from USD0.079 per GB / month on magnetic storage
- transfer of large amounts to or from the internet costs. All the log data have to go IN first: its free from the internet, but might cost from certain services (up to USD 0.01/GB, 10USD/TB). Transfering data OUT to the internet is expansive (up to USD0.090 per GB, that's 90USD/TB). Therefore it's wiser to do all other computation also on an Amazon service (with free or cheap transfer rate). Usually Kibana will only transfer small amounts of data for what it needs to render the grafics or the search query.
- Source: [AWS](https://aws.amazon.com/elasticsearch-service/pricing/)

### Competitors of Amazon ELS

#### Logsene
[Logsene by SemaText](https://sematext.com/logsene/) is an alternative service that integrates with SPM Performance Monitoring. Available in the Cloud and On Premise. Correlate logs with performance metrics via SPM. UI view of logs.

#### Whoosh
[Whoosh](https://pypi.python.org/pypi/Whoosh/) is developped in Python (ELS in Java). Not as powerfull but usefull if you code in python.


#### Apache Solr
[Apache Solr](https://lucene.apache.org/solr/) needs a schema (not ELS), has bigger community. Better performances.


