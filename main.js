const PowerCalc = {
    template: `
        <div>
            <h2>Power Calculator</h2>

            <label>Number of Machines</label>
            <input type="number" v-model.number="machines">

            <label>Power consumed per machine(MW)</label>
            <input type="number" v-model.number="mw">

            <p>Total: {{ machines * mw }} MW</p>
        </div>
    `,

    data() {
        return {
            machines: 0,
            mw: 0
        }
    }
}

const RateConv = {
    template: `
        <div>
            <h2>Production Rate Conversion</h2>

            <label>Crafting Time (Seconds)</label>
            <input type="number" v-model.number="craftingTime">

            <label>Quantity Crafted Per Cycle</label>
            <input type="number" v-model.number="quantity">

            <p>Items/min: {{ (60 / craftingTime) * quantity }}</p>
            <p>Items/sec: {{ (1 / craftingTime) * quantity }}</p>

            <hr>

            <label>Production Rate (Items/min)</label>
            <input type="number" v-model.number="itempmin">

            <label>Quantity Crafted Per Cycle</label>
            <input type="number" v-model.number="quantitypercycle">

            <p>Crafting Time: {{ (quantitypercycle / itempmin) * 60 }}</p>
        </div>
    `,

    data() {
        return {
            craftingTime: 1,
            quantity: 1,
            itempmin: 1,
            quantitypercycle: 1
        }
    }
}

const RatioCalc = {
    template: `
        <div>
            <h2>Ratio Calculator</h2>
            <h3>Please use the same unit for all production rates</h3>
            <div>
                
                <label>Output Part Name</label>
                <input v-model="output.name">
                <label>Target Production Rate</label>
                <input type="number" v-model.number="output.rate">
                <label>Production Rate per machine</label>
                <input type="number" v-model.number="output.machinerate">

            </div>
            <div
                v-for="(part, index) in parts"
                :key="index"
            >
                <label>Input Part Name</label>
                <input
                    v-model="part.name"
                    placeholder="Iron Plate"
                >

                <label>Production Rate</label>
                <input
                    type="number"
                    v-model.number="part.rate"
                >

                <label>Parts required per cycle OR production rate</label>
                <input
                    type="number"
                    v-model.number="part.required"
                >

                <p>Remember to use consistent units</p>

                <hr>
            </div>

            <button @click="addPart">
                Add input part
            </button>

            <div>
                <h3>Total Machine count</h3>
                <p>Total {{ output.name }} machines required: {{ output.rate / output.machinerate }}</p>

            <p
                v-for="(part, index) in parts"
                :key="'result-' + index"
            >
                Total {{ part.name }} machines required: {{ (output.rate * part.required) / part.rate }}
            </p>

            </div>
        </div>
    `,

    data() {
        return {
            output: {
                name: "",
                rate: 0,
                machinerate: 1
            },
            parts: [
                {
                    name: "",
                    rate: 0,
                    required: 0
                }
            ]
        }
    },


    methods: {
        addPart() {
            this.parts.push({
                name: "",
                rate: 0,
                required: 0
            })
        }
    }
}

const MaterialCalc = {
    template: `
        <div>
            <h2>Material Cost Calculator</h2>

            <div
                v-for="(material, index) in materials"
                :key="index"
            >
                <label>Material Name</label>
                <input
                    v-model="material.name"
                    placeholder="Iron"
                >

                <label>Amount Required</label>
                <input
                    type="number"
                    v-model.number="material.amount"
                >

                <hr>
            </div>

            <button @click="addMaterial">
                Add Material
            </button>

            <h3>Total Materials</h3>

            <p
                v-for="(material, index) in materials"
                :key="'result-' + index"
            >
                {{ material.amount }}
                {{ material.name }}
                required
            </p>
        </div>
    `,

    data() {
        return {
            materials: [
                {
                    name: "",
                    amount: 0
                }
            ]
        }
    },

    methods: {
        addMaterial() {
            this.materials.push({
                name: "",
                amount: 0
            })
        }
    }
}

const BeltRate = {
    template: `
        <div>
            <h2>Belt Rate Calculator</h2>

            <label>Max Beltspeed (Items/min or Items/s)</label>
            <input type="number" v-model.number="maxbeltspeed">

            <label>Throughput demand (Same unit as above)</label>
            <input type="number" v-model.number="throughput">
            <p>Fully Saturated Belts needed: {{ throughput / maxbeltspeed }}</p>
        </div>
    `,

    data() {
        return {
            maxbeltspeed: 60,
            throughput: 60
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            currentView: "power"
        }
    },

    components: {
        PowerCalc,
        RateConv,
        MaterialCalc,
        RatioCalc,
        BeltRate
    },

    template: `
        <div>

            <nav>
                <button @click="currentView='power'">Power Calculator</button>
                <button @click="currentView='rate'">Rate Conversion</button>
                <button @click="currentView='ratio'">Ratio Calculator</button>
                <button @click="currentView='material'">Materials Calculator</button>
                <button @click="currentView='belt'">Belt Speed Calculator</button>
            </nav>

            <PowerCalc v-if="currentView==='power'" />
            <RateConv v-if="currentView==='rate'" />
            <RatioCalc v-if="currentView==='ratio'" />
            <MaterialCalc v-if="currentView==='material'" />
            <BeltRate v-if="currentView==='belt'" />

        </div>
    `
})

app.mount("#app")