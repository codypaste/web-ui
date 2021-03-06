ensure-semantic-ui:
	cd ./semantic && gulp build

serve: ensure-semantic-ui
	ng serve

build: ensure-semantic-ui
	ng build --aot --prod --optimization --build-optimizer --service-worker --stats-json

.PHONY: build
