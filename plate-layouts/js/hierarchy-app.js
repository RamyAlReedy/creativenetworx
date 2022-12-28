Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {

        var startClickInside = false;
        var isVisible = function () {
            !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
        }

        var isVisible = function (elem) {
            if (elem && elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) {
                return true;
            }
            return false;
        }

        var mouseDownListener = function () {
            document.addEventListener('mousedown', function () {
                if (el.contains(event.target)) {
                    startClickInside = true;
                }
                else {
                    startClickInside = false;
                }
            });
        }

        var outsideClickListener = function() {
            if (!startClickInside && !el.contains(event.target) && isVisible(el)) {
              binding.value();
            }
        }

        var removeClickListener = function () {
            document.removeEventListener('mousedown', mouseDownListener);
            document.removeEventListener('mouseup', outsideClickListener);
            startClickInside = false;
        }

        document.addEventListener('mousedown', mouseDownListener);
        document.addEventListener('mouseup', outsideClickListener);
    }
});

//ACTIVATE ACCOUNT APP
var app = new Vue({
    el: '#app',
    data: {
        edit_mode: true,
        placement_design: true,
        hierarchy_design: {
            cabinet: false,
            shelf: false,
            tray: false,
            plate: false,
            well: false,
            plant: false,
            leaf: false,
            exp_unit: null,
            obs_units: [],
        },
        sort: {
            sort_by: 'id',
            sort_order: 'ASC',
        },
        filters: {
            sample_id: [],
            role: [],
            rate: [],
            method: [],
            condition_set: [],
        },
        randomization: {
            applied: false,
            mode: 'full',
            blocks: 0,
            grouping_by: 'replicate',
        },
        randomize_ids: [],
        treatments: [
            { id: 1, treatment_id: 1, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 2, treatment_id: 2, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 3, treatment_id: 3, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 4, treatment_id: 4, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 5, treatment_id: 5, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 6, treatment_id: 6, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '200', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 7, treatment_id: 7, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 8, treatment_id: 8, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 9, treatment_id: 9, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 10, treatment_id: 10, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 11, treatment_id: 11, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 12, treatment_id: 12, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '50', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 13, treatment_id: 13, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 14, treatment_id: 14, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 15, treatment_id: 15, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 16, treatment_id: 16, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 17, treatment_id: 17, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 18, treatment_id: 18, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '12.5', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 19, treatment_id: 19, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 20, treatment_id: 20, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 21, treatment_id: 21, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 22, treatment_id: 22, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 23, treatment_id: 23, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 24, treatment_id: 24, place: null, sample_id: 'Sample.ID.1', role: 'test_sample', rate: '3.125', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 25, treatment_id: 25, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 26, treatment_id: 26, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 27, treatment_id: 27, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 28, treatment_id: 28, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 29, treatment_id: 29, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 30, treatment_id: 30, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '200', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 31, treatment_id: 31, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 32, treatment_id: 32, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 33, treatment_id: 33, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 34, treatment_id: 34, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 35, treatment_id: 35, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 36, treatment_id: 36, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '50', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 37, treatment_id: 37, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 38, treatment_id: 38, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 39, treatment_id: 39, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 40, treatment_id: 40, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 41, treatment_id: 41, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 42, treatment_id: 42, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '12.5', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },

            { id: 43, treatment_id: 43, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 44, treatment_id: 44, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.1' },
            { id: 45, treatment_id: 45, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.1' },

            { id: 46, treatment_id: 46, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '1 of 3', block: 1, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 47, treatment_id: 47, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '2 of 3', block: 2, method: 'Method.1', condition_set: 'Condition.Set.2' },
            { id: 48, treatment_id: 48, place: null, sample_id: 'Sample.ID.2', role: 'test_sample', rate: '3.125', replicate: '3 of 3', block: 3, method: 'Method.1', condition_set: 'Condition.Set.2' },
        ],
        plates: [
            //{ id: 1, size: 384, name: 'Plate Name Goes Here', wells: [], filter_match: false, well_result_count: 0, },
        ],
        last_plate_id_used: 0,
        add_plate_data: { id: -1, name: '', size: 0, columns: 4, rows: 4, barcode: '', wells: [], filter_match: false, well_result_count: 0, },
        edit_plate_data: { id: -1, name: '', size: 0, columns: 4, rows: 4, barcode: '', wells: [], filter_match: false, well_result_count: 0, },
        generate_plates_data: { mode: 'layout', size: 24, direction: 'across', plate_layout: {}, prefix: 'Plate - ' },
        generate_trays_data: { columns: 4, rows: 4, direction: 'across', prefix: 'Tray - ' },
        randomize_data: { mode: 'full', parameter: 'Replicate' },
        layouts_filter: {
            main_view: 'my_layouts',
            sizes: [],
        },
        current_plate_index: -1,
        current_plate_index_id: -1,
        selected_treatments: [],
        selected_wells: [],
        role_colors: {
            test_sample: '#ffcc32',
            ctrl_w_sample: '#ff3302',
            ctrl_wo_sample: '#0066ff',
            blank: '#999',
        },
        role_names: {
            test_sample: 'TSTSAM',
            ctrl_w_sample: 'CTRLSAM',
            ctrl_wo_sample: 'CTRLNOSAM',
        },
        plate_sizes: {
            384: {
                name: '384',
                columns: 24,
                rows: 16,
            },
            96: {
                name: '96',
                columns: 12,
                rows: 8,
            },
            48: {
                name: '48',
                columns: 8,
                rows: 6,
            },
            24: {
                name: '24',
                columns: 6,
                rows: 4,
            },
        },
        well_row_letters: {
            0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P',
        },
        platforms: [
            { id: 1, name: 'IDES', },
            { id: 2, name: 'HDES', },
            { id: 3, name: 'FDES', },
            { id: 4, name: 'IMPS', },
            { id: 5, name: 'FMPS', },
            { id: 6, name: 'IPPS', },
            { id: 7, name: 'HPPS', },
            { id: 8, name: 'FPPS', },
            { id: 9, name: 'ISPS', },
            { id: 10, name: 'HSPS', },
        ],
        plate_layouts: [
            {id: 1, name: 'Plate.Layout.1', size: 96, platform: 1, method_default: true,},
            {id: 2, name: 'Plate.Layout.2', size: 384, platform: 2, method_default: false,},
            {id: 3, name: 'Plate.Layout.3', size: 48, platform: 3, method_default: false,},
            {id: 4, name: 'Plate.Layout.4', size: 24, platform: 4, method_default: false,},
            {id: 5, name: 'Plate.Layout.5', size: 96, platform: 1, method_default: false,},
            {id: 6, name: 'Plate.Layout.6', size: 384, platform: 2, method_default: false,},
            {id: 7, name: 'Plate.Layout.7', size: 48, platform: 3, method_default: false,},
            {id: 8, name: 'Plate.Layout.8', size: 24, platform: 4, method_default: false,},
        ],
        treatment_result_count: 0,
        well_result_count: 0,
        add_content: {
            condition_set: '',
            sample_id: '',
            rate: '',
        },
        c_s_active: false,
        s_active: false,
        r_active: false,
        highlight_by: '',
        mousedown: false,
        mousedown_target: null,
        temp_selection: [],
        shiftKeyPressed: false,
        ctrlKeyPressed: false,
        selected_columns: [],
        selected_rows: [],
        last_col_index: -1,
        last_row_index: -1,
        createModalScrollInterval: null,
        createMultiplePluginIntervals: [],

        clone_step: 'select_parameter',

        clone_selected_sample_ids: [],

        clone_original_condition_sets: ['Condition.Set.1'],
        clone_available_condition_sets: ['Condition.Set.2', 'Condition.Set.3', 'Condition.Set.4', 'Condition.Set.5'],
        clone_selected_condition_sets: [],

        clone_original_rates: [1000, 500, 250, 100],
        clone_available_rates: [2000, 750, 600, 125, 50, 25, 12.5, 3.125],
        clone_selected_rates: [],

        clone_original_replicates: 2,
        clone_available_replicates: 4,
        clone_selected_replicates: 2,

    },
    watch: {
        selected_wells: function () {
            this.selected_columns = [];
            this.selected_rows = [];
            this.last_col_index = -1;
            this.last_row_index = -1;
            var columns = {};
            var rows = {};
            var rows_letters_array = Object.values(this.well_row_letters);
            for (var i = 0; i < this.selected_wells.length; i++) {

                var well_location = this.get_well_location(this.selected_wells[i]);

                if (!columns[well_location.column]) {
                    columns[well_location.column] = [];
                }
                columns[well_location.column].push(this.selected_wells[i]);

                if (!rows[well_location.row]) {
                    rows[well_location.row] = [];
                }
                rows[well_location.row].push(this.selected_wells[i]);

            }

            if (this.plates.length) {
                var column_count = this.current_col_count;
                var row_count = this.current_row_count;

                for (var key of Object.keys(columns)) {
                    if (columns[key].length === row_count) {
                        this.selected_columns.push(key - 1);
                        if (Object.keys(columns).length === 1) {
                            this.last_col_index = key - 1;
                        }
                    }
                }

                for (var key of Object.keys(rows)) {
                    if (rows[key].length === column_count) {
                        var row_index = rows_letters_array.indexOf(key);
                        this.selected_rows.push(row_index);
                        if (Object.keys(rows).length === 1) {
                            this.last_row_index = row_index;
                        }
                    }
                }
            }


        },
    },
    created: function () {
        var self = this;
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey || e.metaKey) {
                self.ctrlKeyPressed = true;
            }
            if (e.shiftKey) {
                self.shiftKeyPressed = true;
            }
        });
        document.addEventListener("keyup", function (e) {
            if (!e.ctrlKey && !e.metaKey) {
                self.ctrlKeyPressed = false;
            }
            if (!e.shiftKey) {
                self.shiftKeyPressed = false;
            }
        });
        window.addEventListener('resize', function () {
            self.ctrlKeyPressed = false;
            self.shiftKeyPressed = false;
        });

        document.addEventListener('mousedown', function (e) {
            self.mousedown = true;
            self.mousedown_target = e.target;
        });
        document.addEventListener('mouseup', function () {
            self.mousedown = false;
            self.mousedown_target = null;
            var option3 = jQuery('.option-3-container').length;
            if (self.temp_selection.length) {
                self.temp_selection = self.remove_duplicates(self.temp_selection);
                self.selected_wells.push.apply(self.selected_wells, self.temp_selection);
                self.selected_wells = self.remove_duplicates(self.selected_wells);
                if (option3) {
                    self.selected_treatments.push.apply(self.selected_treatments, self.temp_selection);
                    self.selected_treatments = self.remove_duplicates(self.selected_treatments);
                }
            }
            self.temp_selection = [];

            // for (var i = 0; i < self.createMultiplePluginIntervals.length; i++) {
            //     clearInterval(self.createMultiplePluginIntervals[i]);
            // }
        });

        //document.addEventListener('mousemove', this.selection_move_scroll);
    },
    methods: {
        choose_layout: function (layout_id) {
            var plate_layout = this.getObjectByKey(this.plate_layouts, 'id', layout_id);
            if (plate_layout) {
                this.generate_plates_data.plate_layout = JSON.parse(JSON.stringify(plate_layout));
            }
            Figure.toggleDropdown('.fi-dropdown.fi-dropdown-open');
        },
        close_generate_plates: function () {
            this.generate_plates_data = { mode: 'layout', size: 24, direction: 'across', plate_layout: {}, prefix: 'Plate - ', };
        },
        close_generate_trays: function () {
            this.generate_trays_data = { columns: 4, rows: 4, direction: 'across', prefix: 'Tray - ' };
        },
        close_randomize: function () {
            this.randomize_data = { mode: 'full', parameter: 'Replicate' };
        },
        toggle_clone_value: function (type, value) {
            if (type === 'condition_sets') {
                var value_index = this.clone_selected_condition_sets.indexOf(value);
                if (value_index > -1) {
                    this.clone_selected_condition_sets.splice(value_index, 1);
                }
                else {
                    this.clone_selected_condition_sets.push(value);
                    this.clone_selected_condition_sets.sort(function(a,b){
                        return parseInt(a) - parseInt(b);
                    });
                }
            }
            else if (type === 'rates') {
                var value_index = this.clone_selected_rates.indexOf(value);
                if (value_index > -1) {
                    this.clone_selected_rates.splice(value_index, 1);
                }
                else {
                    this.clone_selected_rates.push(value);
                    this.clone_selected_rates.sort(function(a,b){
                        return parseInt(b) - parseInt(a);
                    });
                }
            }
        },
        close_clone_plate: function () {
            this.clone_step = 'select_parameter';
            this.clone_selected_condition_sets = [];
            this.clone_selected_rates = [];
            this.clone_selected_replicates = 2;
        },
        regenerate_wells_for_plate: function (plate_id) {

            var option3 = jQuery('.option-3-container').length;

            var plate = this.getObjectByKey(this.plates, 'id', plate_id);
            if (plate) {
                plate.wells = [];

                var well_count = 0;
                if (plate.size) {
                    well_count = plate.size;
                }
                else if (plate.columns && plate.rows) {
                    well_count = plate.columns * plate.rows;
                }

                for (var i = 0; i < well_count; i++) {
                    var content = null;
                    if (option3) {
                        content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                    plate.wells.push({
                        id: i+1,
                        content: content,
                        filter_match: false,
                        well_result_count: 0,
                        highlight: false,
                    });
                }
            }
        },
        submit_add_plate: function () {
            if (this.add_plate_data.name && (this.add_plate_data.size != 0 || this.add_plate_data.columns && this.add_plate_data.rows)) {
                this.last_plate_id_used++;
                this.add_plate_data.id = this.last_plate_id_used;
                this.plates.push(JSON.parse(JSON.stringify(this.add_plate_data)));
                this.regenerate_wells_for_plate(this.last_plate_id_used);

                this.current_plate_index = this.getObjectIndexByKey(this.plates, 'id', this.last_plate_id_used);

                Figure.modal('.add_plate_modal').hide();
            }
        },
        close_add_plate: function () {
            this.add_plate_data = { id: -1, name: '', size: 0, columns: 4, rows: 4, barcode: '', wells: [], filter_match: false, well_result_count: 0, };
        },
        open_edit_plate: function (plate_id) {
            var plate = this.getObjectByKey(app.plates, 'id', plate_id);
            if (plate) {
                var plate_data = JSON.parse(JSON.stringify(plate));
                this.edit_plate_data = plate_data;
            }
        },
        submit_edit_plate: function () {
            if (this.edit_plate_data.name && (this.edit_plate_data.size != 0 || this.edit_plate_data.columns && this.edit_plate_data.rows)) {
                var plate = this.getObjectByKey(app.plates, 'id', this.edit_plate_data.id);
                if (plate) {
                    plate.name = this.edit_plate_data.name;
                    plate.barcode = this.edit_plate_data.barcode;
                    if (plate.size != this.edit_plate_data.size) {
                        plate.size = this.edit_plate_data.size;
                        this.regenerate_wells_for_plate(plate.id);
                    }
                    else {
                        plate.columns = this.edit_plate_data.columns;
                        plate.rows = this.edit_plate_data.rows;
                        this.regenerate_wells_for_plate(plate.id);

                        plate.size = this.edit_plate_data.size;
                    }
                }

                Figure.modal('.edit_plate_modal').hide();
                if (jQuery('.tray-container').length) {
                    jQuery('.tray-container .drag-select-inner').css({ width: this.current_col_count * 70.8 });
                }
            }
        },
        close_edit_plate: function () {
            this.edit_plate_data = { id: -1, name: '', size: 0, columns: 4, rows: 4, barcode: '', wells: [], filter_match: false, well_result_count: 0, };
        },
        delete_plate: function (plate_index) {

            var self = this;

            Figure.confirm({
                message: 'Are you sure you want to delete this plate?',
                title: 'Delete Plate',
                onConfirm: function () {
                    self.clear_plate(plate_index);
                    self.plates.splice(plate_index, 1);
                    if (self.current_plate_index == plate_index && plate_index === self.plates.length || self.current_plate_index > plate_index) {
                        self.current_plate_index--;
                    }
                    self.$forceUpdate();
                },
                onCancel: function () {

                },
                okText: "Yes, I'm Sure",
                cancelText: "Cancel",
            });

        },
        disable_placement_design: function () {

            var self = this;

            Figure.confirm({
                message: `<p>This process will disable placement design and all trays created will be deleted.</p><p>Are you sure you want to proceed?</p>`,
                title: 'Disable Placement Design',
                onConfirm: function () {
                    for (var i = 0; i < self.plates.length; i++) {
                        self.clear_plate(i);
                        self.plates.splice(i, 1);
                        if (self.current_plate_index == i && i === self.plates.length || self.current_plate_index > i) {
                            self.current_plate_index--;
                        }
                        i--;
                        self.$forceUpdate();
                    }
                    self.placement_design = false;

                    self.selected_treatments = [];
                    self.selected_wells = [];
                    self.clear_filters();
                    self.reset_highlight();

                    self.$forceUpdate();

                    jQuery('.filters.fi-accordion .fi-child-open').removeClass('fi-child-open');
                    jQuery('.filters.fi-accordion .fi-accordion-content').hide();
                },
                onCancel: function () {

                },
                okText: "Yes, I'm Sure",
                cancelText: "Cancel",
            });

        },
        randomize_array: function (array) {
          var currentIndex = array.length,  randomIndex;

          while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
          }
          return array;
        },
        submit_randomize: function () {

            this.randomize_ids = [];

            for (var i = 0; i < this.treatments.length; i++) {
                this.randomize_ids.push(this.treatments[i].id);
            }

            this.randomize_array(this.randomize_ids);

            for (var i = 0; i < this.randomize_ids.length; i++) {
                this.treatments[i].id = this.randomize_ids[i];
            }

            this.randomization.applied = true;
            this.randomization.mode = this.randomize_data.mode;
            Figure.modal('.randomize_modal, .randomize_all_modal').hide();
        },
        submit_derandomize: function () {
            for (var i = 0; i < this.treatments.length; i++) {
                this.treatments[i].id = this.treatments[i].treatment_id;
            }
            this.randomization.applied = false;
            this.randomization.mode = 'full';
            Figure.modal('.derandomize_modal, .derandomize_all_modal').hide();
        },
        start_plate_drag: function () {
            this.current_plate_index_id = this.plates[this.current_plate_index].id;
        },
        end_plate_drag: function () {
            this.current_plate_index = this.getObjectIndexByKey(this.plates, 'id', this.current_plate_index_id);
            jQuery(document).trigger('mouseup');
        },
        getObjectByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        getObjectIndexByKey: function (array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return i;
                }
            }
            return null;
        },
        check_number: function (value) {
            var reg = /^\d+$/;
            return reg.test(value);
        },
        remove_duplicates: function (array) {
            var unique = {};
            array.forEach(function(i) {
              if(!unique[i]) {
                unique[i] = true;
              }
            });
            return Object.keys(unique);
        },
        count_placed_treatments: function () {
            var count = 0;
            for (var i = 0; i < this.treatments.length; i++) {
                if (this.treatments[i].place) {
                    count++;
                }
            }
            return count;
        },
        count_placed_wells: function (plate) {
            var count = 0;
            for (var i = 0; i < plate.wells.length; i++) {
                if (plate.wells[i].content) {
                    count++;
                }
            }
            return count;
        },
        get_column_count: function () {
            if (this.selected_wells.length) {
                var col_count = 0;
                var actual_col_count = this.current_col_count;
                for (var i = 0; i < this.selected_wells.length; i++) {
                    if (i !== this.selected_wells.length - 1) {
                        if (parseInt(this.selected_wells[i]) > actual_col_count) {
                            break;
                        }
                        else {
                            col_count++;
                        }
                    }
                }
                return col_count;
            }
            else {
                return 0;
            }
        },
        get_well_location: function (id) {
            var columns = this.current_col_count;
            var letter = this.well_row_letters[Math.floor((parseInt(id)-1)/columns)];
            var number = parseInt(id) - (columns * Math.floor( parseInt(id)/columns ));
            if (!number) {
                number = parseInt(id) / Math.floor( parseInt(id)/columns );
            }
            return {
                row: letter,
                column: number,
            };
        },
        selection_sorted: function (selection) {
            var clone_selection = [].concat(selection);
            return clone_selection.sort(function(a,b){
                return parseInt(a) - parseInt(b);
            });
        },
        selection_treatments: function (new_selection) {
            this.selected_treatments = new_selection;
        },
        selection: function (new_selection) {

            if (this.edit_mode) {
                this.highlight_by = '';
                this.highlight_id = 0;
            }

            var option3 = jQuery('.option-3-container').length;
            if (this.shiftKeyPressed) {
                var first_item = parseInt(this.selection_sorted(this.selected_wells)[0]);
                var last_item = parseInt(this.selection_sorted(new_selection)[new_selection.length-1]);
                if (last_item < first_item) {
                    var first_item = parseInt(this.selection_sorted(new_selection)[new_selection.length-1]);
                    var last_item = parseInt(this.selection_sorted(this.selected_wells)[this.selected_wells.length - 1]);
                }
                var range = last_item - first_item + 1;
                this.selected_wells = [];
                if (option3) {
                    this.selected_treatments = [];
                }
                for (var i = 0; i < range; i++) {
                    this.selected_wells.push(first_item.toString());
                    if (option3) {
                        this.selected_treatments.push(first_item.toString());
                    }
                    first_item = parseInt(first_item) + 1;
                }
            }
            else if (this.ctrlKeyPressed) {
                if (this.mousedown) {
                    this.temp_selection.push.apply(this.temp_selection, new_selection);
                }
                else {
                    for (var i = 0; i < new_selection.length; i++) {
                        var existingIndex = this.selected_wells.indexOf(new_selection[i]);
                        if (existingIndex > -1) {
                            this.selected_wells.splice(existingIndex, 1);
                            if (option3) {
                                this.selected_treatments.splice(existingIndex, 1);
                            }
                        }
                        else {
                            this.selected_wells.push(new_selection[i]);
                            if (option3) {
                                this.selected_treatments.push(new_selection[i]);
                            }
                        }
                    }
                }
            }
            else {
                this.selected_wells = new_selection;
                if (option3) {
                    this.selected_treatments = new_selection;
                }
            }
        },
        selection_move_scroll: function (e) {
            if (this.mousedown) {

               for (var i = 0; i < this.createMultiplePluginIntervals.length; i++) {
                   clearInterval(this.createMultiplePluginIntervals[i]);
               }

               var mouseX = e.pageX, mouseY = e.pageY;

               var scrollContainer;
               if (jQuery(this.mousedown_target).is('.plate-container, .plate-container *')) {
                   scrollContainer = jQuery('.plate-container');
               }
               else if (jQuery(this.mousedown_target).is('.treatments-inner, .treatments-inner *')) {
                   scrollContainer = jQuery('.treatments-inner');
               }

               if (scrollContainer) {
                   var scrollContainerWidth = scrollContainer.outerWidth();
                   var scrollContainerHeight = scrollContainer.outerHeight();
                   var scrollContainerPosX = scrollContainer.offset().left;
                   var scrollContainerPosXEdge = scrollContainerPosX + scrollContainerWidth;
                   var scrollContainerPosY = scrollContainer.offset().top;
                   var scrollContainerPosYEdge = scrollContainerPosY + scrollContainerHeight;

                   if (mouseX < scrollContainerPosX || mouseX >= scrollContainerPosXEdge) {

                       var scrollDirection, scrollSpeed;
                       if (mouseX < scrollContainerPosX) {
                           scrollDirection = -10;
                           scrollSpeed = Math.floor(1/Math.abs(mouseX) * 200);
                       }
                       else if (mouseX >= scrollContainerPosXEdge) {
                           scrollDirection = 10;
                           scrollSpeed = Math.floor(1/(mouseX - scrollContainerPosXEdge) * 200);
                       }

                       this.createMultiplePluginIntervals.push(
                           this.createModalScrollInterval = setInterval(function () {
                               var currentScrollLeft = scrollContainer.scrollLeft();
                               scrollContainer.scrollLeft(currentScrollLeft + scrollDirection);
                           }, scrollSpeed)
                       );
                   }
                   else if (mouseY < scrollContainerPosY || mouseY >= scrollContainerPosYEdge) {

                       var scrollDirection, scrollSpeed;
                       if (mouseY < scrollContainerPosY) {
                           scrollDirection = -10;
                           scrollSpeed = Math.floor(1/Math.abs(mouseY) * 200);
                       }
                       else if (mouseY >= scrollContainerPosYEdge) {
                           scrollDirection = 10;
                           scrollSpeed = Math.floor(1/(mouseY - scrollContainerPosYEdge) * 200);
                       }

                       this.createMultiplePluginIntervals.push(
                           this.createModalScrollInterval = setInterval(function () {
                               var currentScrollTop = scrollContainer.scrollTop();
                               scrollContainer.scrollTop(currentScrollTop + scrollDirection);
                           }, scrollSpeed)
                       );
                   }
                   else {
                       for (var i = 0; i < this.createMultiplePluginIntervals.length; i++) {
                           clearInterval(this.createMultiplePluginIntervals[i]);
                       }
                   }
               }
           }
       },
        well_mouseover: function (id) {
            var columns = this.current_col_count;
            var row_index = Math.floor((parseInt(id)-1)/columns);
            var column_index = parseInt(id) - (columns * Math.floor( parseInt(id)/columns )) - 1;
            if (column_index < 0) {
                column_index = parseInt(id) / Math.floor( parseInt(id)/columns ) - 1;
            }
            jQuery('.plate-columns .plate-column').eq(column_index).addClass('hover');
            jQuery('.plate-rows .plate-row').eq(row_index).addClass('hover');
        },
        well_mouseout: function (id) {
            jQuery('.plate-columns .plate-column').removeClass('hover');
            jQuery('.plate-rows .plate-row').removeClass('hover');
        },
        select_all_treatments: function () {
            this.selected_treatments = [];
            for (var i = 0; i < this.treatments_filtered_list.length; i++) {
                this.selected_treatments.push(this.treatments_filtered_list[i].id.toString());
            }
        },
        place_series: function (array) {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var already_placed = this.getObjectByKey(app.plates[this.current_plate_index].wells, 'content', this.selected_treatments[i]);
                if (already_placed) {
                    already_placed.content = null;
                }
                this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', array[i]).content = this.selected_treatments[i];
                this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]).place = { plate_id: this.plates[this.current_plate_index].id, well_id: array[i] };
            }
            this.$nextTick(function () {
                this.selected_treatments = [];
                this.selected_wells = [];
                this.reset_highlight();
            });
        },
        place_across: function () {
            this.selected_wells = this.selection_sorted(this.selected_wells);
            this.place_series(this.selected_wells);
        },
        place_down: function () {
            // var column_count = this.get_column_count();
            // var row_count = this.selected_wells.length / columns;
            // var columns = [];
            // for (var i = 0; i < column_count; i++) {
            //     columns.push([]);
            // }
            // var column_index = 0;
            // for (var i = 0; i < this.selected_wells.length; i++) {
            //     columns[column_index].push(this.selected_wells[i]);
            //     if (column_index === column_count - 1) {
            //         column_index = 0;
            //     }
            //     else {
            //         column_index++;
            //     }
            // }
            // var down_array = [].concat.apply([], columns);

            this.selected_wells = this.selection_sorted(this.selected_wells);

            var down_array = [];
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well_location = this.get_well_location(this.selected_wells[i]);
                down_array.push({
                    id: this.selected_wells[i],
                    location: well_location.column + '' + well_location.row,
                });
            }

            var reA = /[^0-9]/g;
            var reN = /[^a-zA-Z]/g;

            down_array.sort(function (a, b) {
                var aA = parseInt(a.location.replace(reA, ""), 10);
                var bA = parseInt(b.location.replace(reA, ""), 10);
                if (aA === bA) {
                    var aN = a.location.replace(reN, "");
                    var bN = b.location.replace(reN, "");
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                }
                return aA > bA ? 1 : -1;
            });

            var result_down_array = [];

            for (var i = 0; i < down_array.length; i++) {
                result_down_array.push(down_array[i].id);
            }

            this.place_series(result_down_array);
        },
        set_as_blank: function () {
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                if (treatment) {
                    treatment.place = null;
                }
                well.content = 'blank';
            }
            this.selected_wells = [];
            this.reset_highlight();
        },
        unplace_treatments: function () {
            for (var i = 0; i < this.selected_treatments.length; i++) {
                var treatment = this.getObjectByKey(this.treatments, 'id', this.selected_treatments[i]);
                if (treatment.place) {
                    var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', treatment.place.well_id);
                    if (well) {
                        well.content = null;
                    }
                    treatment.place = null;
                }
            }
            this.selected_treatments = [];
        },
        unplace_wells: function () {
            var option3 = jQuery('.option-3-container').length;
            for (var i = 0; i < this.selected_wells.length; i++) {
                var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', this.selected_wells[i]);
                var content = null;
                if (option3) {
                    content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                }
                if (well.content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', well.content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    well.content = content;
                }
            }
            this.selected_wells = [];
            this.reset_highlight();
        },
        clear_plate: function (plate_index) {
            var option3 = jQuery('.option-3-container').length;
            for (var i = 0; i < this.plates[plate_index].wells.length; i++) {
                if (this.plates[plate_index].wells[i].content) {
                    var treatment = this.getObjectByKey(this.treatments, 'id', this.plates[plate_index].wells[i].content);
                    if (treatment) {
                        treatment.place = null;
                    }
                    this.plates[plate_index].wells[i].content = null;
                    if (option3) {
                        this.plates[plate_index].wells[i].content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                }
            }
            this.selected_wells = [];
            this.highlight_by = '';
            this.highlight_id = 0;
        },
        toggle_filter: function (type, value) {
            var self = this;
            var value_index = self.filters[type].indexOf(value);
            if (value_index === -1) {
                self.filters[type].push(value);
            }
            else {
                self.filters[type].splice(value_index, 1);
            }
        },
        toggle_layouts_filter: function (type, value) {
            var self = this;
            var value_index = self.layouts_filter[type].indexOf(value);
            if (value_index === -1) {
                self.layouts_filter[type].push(value);
            }
            else {
                self.layouts_filter[type].splice(value_index, 1);
            }
        },
        clear_filters: function () {
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                this.$set(this.filters, key, []);
            }
        },
        fill_wells: function () {
            var self = this;
            for (var i = 0; i < self.selected_wells.length; i++) {
                var well = self.getObjectByKey(self.plates[self.current_plate_index].wells, 'id', self.selected_wells[i]);
                if (well.content) {
                    if (well.content === 'blank') {
                        well.content = {sample_id: '', role: '', condition_set: '', method: '', replicate: '', rate: '',};
                    }
                    if (self.add_content.condition_set) {
                        well.content.condition_set = self.add_content.condition_set;
                        well.content.method = 'Method.1';
                    }
                    if (self.add_content.sample_id) {
                        well.content.sample_id = self.add_content.sample_id;
                        well.content.role = 'test_sample';
                    }
                    if (self.add_content.rate) {
                        well.content.rate = self.add_content.rate;
                    }
                    if (self.add_content.condition_set && self.add_content.sample_id && self.add_content.rate || well.content.condition_set && well.content.sample_id && well.content.rate) {
                        well.content.replicate = (i+1) + ' of ' + self.selected_wells.length;
                    }
                }
            }
            self.selected_wells = [];
            self.reset_highlight();
            self.add_content = {
                condition_set: '',
                sample_id: '',
                rate: '',
            };
            self.c_s_active = false;
            self.s_active = false;
            self.r_active = false;
            Figure.modal('#add-content').hide();
        },
        tooltip_class: function (well_id) {
            var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', well_id);
            if (well.content.role === 'test_sample' && well.content.sample_id && well.content.rate || well.content.role === 'ctrl_w_sample' && well.content.sample_id && well.content.rate || well.content.role === 'ctrl_wo_sample' && well.content.sample_id || well.content.role === 'empty' || well.content === 'blank') {
                return 'complete';
            }
            else {
                return 'not-complete';
            }
        },
        highlight: function(type, id) {
            if (!id) {
                id = 0;
            }
            this.selected_wells = [];
            if (this.highlight_by == type && this.highlight_id == id) {
                if (this.edit_mode) {
                    this.reset_highlight();
                }
                else {
                    this.reset_highlight();
                    for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                        this.plates[this.current_plate_index].wells[i].highlight = false;
                    }
                }
            }
            else {
                this.reset_highlight();

                if (!this.edit_mode) {
                    for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                        this.plates[this.current_plate_index].wells[i].highlight = false;
                    }
                }

                for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                    var well = this.plates[this.current_plate_index].wells[i];
                    var well_content = well.content;

                    if (type === 'unset' && !well_content) {
                        this.highlight_by = type;
                        if (this.edit_mode) {
                            if (!well.disable) {
                                this.selected_wells.push(well.id.toString());
                            }
                        }
                        else {
                            well.highlight = true;
                        }
                    }
                    else if (type === 'empty' && well_content === 'blank') {
                        this.highlight_by = type;
                        if (this.edit_mode) {
                            if (!well.disable) {
                                this.selected_wells.push(well.id.toString());
                            }
                        }
                        else {
                            well.highlight = true;
                        }
                    }
                    else {
                        var treatement_id = parseInt(well_content);
                        var treatment = this.getObjectByKey(this.treatments, 'id', treatement_id);

                        var option3 = jQuery('.option-3-container').length;
                        if (option3) {
                            treatment = well_content;
                        }

                        if (treatment) {
                            if (type === treatment.role) {
                                this.highlight_by = type;
                                if (this.edit_mode) {
                                    if (!well.disable) {
                                        this.selected_wells.push(well.id.toString());
                                    }
                                }
                                else {
                                    well.highlight = true;
                                }
                            }
                        }
                    }
                }
                if (this.edit_mode && !this.selected_wells.length) {
                    this.reset_highlight();
                }
            }
        },
        // reset_highlight: function () {
        //     for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
        //         this.plates[this.current_plate_index].wells[i].highlight = false;
        //     }
        //     this.highlight_by = '';
        // },
        reset_highlight: function () {
            this.highlight_by = '';
            this.highlight_id = 0;
        },
        reset_highlight_click_outside: function () {
            if (!this.edit_mode && !jQuery(event.target).is('.color-key-button') && !jQuery(event.target).closest('.color-key-button').length) {
                this.reset_highlight();
                for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                    this.plates[this.current_plate_index].wells[i].highlight = false;
                }
            }
        },
        select_deselect_column: function (index) {

            if (this.edit_mode) {

                this.selected_wells = [];
                this.reset_highlight();

                if (this.last_col_index != index) {
                    var columns = this.current_col_count;
                    var rows = this.current_row_count;

                    var id = index + 1;

                    var well_ids = [id.toString()];

                    for (var i = 0; i < rows - 1; i++) {
                        id = parseInt(id) + columns;
                        well_ids.push(id.toString());
                    }

                    for (var i = 0; i < well_ids.length; i++) {
                        var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', well_ids[i]);
                        this.selected_wells.push(well_ids[i]);
                    }
                }

            }

        },
        select_deselect_row: function (index) {

            if (this.edit_mode) {

                this.selected_wells = [];
                this.reset_highlight();

                if (this.last_row_index != index) {
                    var columns = this.current_col_count;
                    var rows = this.current_row_count;

                    var id = columns * (index + 1) - columns + 1;

                    var well_ids = [id.toString()];

                    for (var i = 0; i < columns - 1; i++) {
                        id = parseInt(id) + 1;
                        well_ids.push(id.toString());
                    }

                    for (var i = 0; i < well_ids.length; i++) {
                        for (var i = 0; i < well_ids.length; i++) {
                            this.selected_wells.push(well_ids[i]);
                        }
                    }
                }

            }

        },
        select_deselect_all: function () {
            if (this.edit_mode) {

                this.reset_highlight();

                if (this.selected_wells.length !== this.plates[this.current_plate_index].wells.length) {
                    this.selected_wells = [];
                    for (var i = 0; i < this.plates[this.current_plate_index].wells.length; i++) {
                        this.selected_wells.push(this.plates[this.current_plate_index].wells[i].id.toString());
                    }
                }
                else {
                    this.selected_wells = [];
                }

            }
        },
        render_tooltip_content: function (well_id) {
            var well = this.getObjectByKey(this.plates[this.current_plate_index].wells, 'id', well_id);
            var well_content = well.content;

            var well_location = this.get_well_location(well_id);

            if (well_content === 'blank') {
                return `
                <ul class='fi-list well-info-content'>
                    <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                    <li><strong class='label'>Role:</strong> Empty</li>
                </ul>
                `;
            }
            else {
                var treatement_id = parseInt(well_content);

                var option3 = jQuery('.option-3-container').length;

                var treatment = this.getObjectByKey(this.treatments, 'id', treatement_id);

                if (option3) {
                    treatment = well_content;
                }

                if (treatment) {
                    var role = treatment.role;
                    var sample_id = treatment.sample_id;
                    var rate = treatment.rate;
                    var condition_set = treatment.condition_set;
                    var replicate = treatment.replicate;
                    var method = treatment.method;

                    if (role === 'empty') {
                        role = 'Empty';
                    }
                    else if (role === 'test_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['test_sample'] + "'></span>Test Sample</span>";
                    }
                    else if (role === 'ctrl_w_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['ctrl_w_sample'] + "'></span>Control with Sample</span>";
                    }
                    else if (role === 'ctrl_wo_sample') {
                        role = "<span class='color-key'><span class='circle' style='background-color: " + this.role_colors['ctrl_wo_sample'] + "'></span>Control without Sample</span>";
                    }

                    if (!role) {
                        role = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!sample_id) {
                        sample_id = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!rate) {
                        rate = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!condition_set) {
                        condition_set = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!replicate) {
                        replicate = "<span class='fi-text-danger'>Not set</span>";
                    }
                    if (!method) {
                        method = "<span class='fi-text-danger'>Not set</span>";
                    }

                    return `
                    <ul class='fi-list well-info-content'>
                        <li><strong class='label'>Location:</strong> ` + well_location.row + `-` + well_location.column + `</li>
                        <li><strong class='label'>Sample ID:</strong> ` + sample_id + `</li>
                        <li><strong class='label'>Role:</strong> ` + role + `</li>
                        ` + ( treatment.role === 'test_sample' || treatment.role === 'ctrl_w_sample' ? `
                        <li><strong class='label'>Rate:</strong> ` + rate + `</li>
                        ` : `` ) + `
                        <li><strong class='label'>Condition Set:</strong> ` + condition_set + `</li>
                        ` + ( treatment.condition_set && treatment.sample_id && treatment.rate ? `<li><strong class='label'>Replicate:</strong> ` + replicate + `</li>
                        ` : `` ) + `
                        <li><strong class='label'>Method:</strong> ` + method + `</li>
                    </ul>
                    `;
                }
            }
        },
        sort_treatments: function (treatments) {
            var self = this;
            var sort_by = self.sort.sort_by;
            var sort_order = self.sort.sort_order;
            return treatments.sort(function(a, b) {
                if (sort_by == 'place') {
                    var a_place = '', b_place = '';
                    if (a.place) {
                        var well_location = self.get_well_location(a.place.well_id);
                        a_place = a.place.plate_id + ' / ' + well_location.row + '-' + well_location.column;
                    }
                    if (b.place) {
                        var well_location = self.get_well_location(b.place.well_id);
                        b_place = b.place.plate_id + ' / ' + well_location.row + '-' + well_location.column;
                    }
                    if (a_place < b_place || a_place == b_place && parseInt(a.id) < parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else if (a_place > b_place || a_place == b_place && parseInt(a.id) > parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                else if (sort_by == 'id' || sort_by == 'treatment_id' || sort_by == 'rate' || sort_by == 'block') {
                    if (parseInt(a[sort_by]) < parseInt(b[sort_by]) || parseInt(a[sort_by]) == parseInt(b[sort_by]) && parseInt(a.id) < parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else if (parseInt(a[sort_by]) > parseInt(b[sort_by]) || parseInt(a[sort_by]) == parseInt(b[sort_by]) && parseInt(a.id) > parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                else {
                    if (a[sort_by].toLowerCase() < b[sort_by].toLowerCase() || a[sort_by].toLowerCase() == b[sort_by].toLowerCase() && parseInt(a.id) < parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else if (a[sort_by].toLowerCase() > b[sort_by].toLowerCase() || a[sort_by].toLowerCase() == b[sort_by].toLowerCase() && parseInt(a.id) > parseInt(b.id)) {
                        if (sort_order == 'DESC') {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                }
                return 0;
            });
        },
        apply_sort: function (sort_by) {
            if (sort_by !== this.sort.sort_by) {
                this.sort.sort_by = sort_by;
                this.sort.sort_order = 'ASC';
            }
            else if (this.sort.sort_order === 'ASC') {
                this.sort.sort_order = 'DESC';
            }
            else if (this.sort.sort_order === 'DESC') {
                this.sort.sort_order = 'ASC';
            }
        },
    },
    computed: {
        current_col_count: function () {
            if (this.plates[this.current_plate_index].size) {
                return parseInt(this.plate_sizes[this.plates[this.current_plate_index].size].columns);
            }
            else {
                return parseInt(this.plates[this.current_plate_index].columns);
            }
        },
        current_row_count: function () {
            if (this.plates[this.current_plate_index].size) {
                return parseInt(this.plate_sizes[this.plates[this.current_plate_index].size].rows);
            }
            else {
                return parseInt(this.plates[this.current_plate_index].rows);
            }
        },
        sort_class: function () {
            if (this.sort.sort_order === 'DESC') {
                return 'fa-caret-down';
            }
            return 'fa-caret-up';
        },
        unset_count: function () {
            return this.plates[this.current_plate_index].wells.reduce(function(n, well) {
                return n + (!well.content);
            }, 0);
        },
        empty_count: function () {
            var self = this;
            return self.plates[self.current_plate_index].wells.reduce(function(n, well) {
                return n + (well.content === 'blank');
            }, 0);
        },
        test_sample_count: function () {
            var self = this;
            return self.plates[self.current_plate_index].wells.reduce(function(n, well) {
                var role;
                if (parseInt(well.content)) {
                    role = self.getObjectByKey(self.treatments, 'id', well.content).role;
                }
                return n + (role === 'test_sample');
            }, 0);
        },
        ctrl_w_sample_count: function () {
            var self = this;
            return self.plates[self.current_plate_index].wells.reduce(function(n, well) {
                var role;
                if (parseInt(well.content)) {
                    role = self.getObjectByKey(self.treatments, 'id', well.content).role;
                }
                return n + (role === 'ctrl_w_sample');
            }, 0);
        },
        ctrl_wo_sample_count: function () {
            var self = this;
            return self.plates[self.current_plate_index].wells.reduce(function(n, well) {
                var role;
                if (parseInt(well.content)) {
                    role = self.getObjectByKey(self.treatments, 'id', well.content).role;
                }
                return n + (role === 'ctrl_wo_sample');
            }, 0);
        },
        overall_selected_wells: function () {
            var all_selected_wells = [];
            all_selected_wells.push.apply(all_selected_wells, this.selected_wells);
            all_selected_wells.push.apply(all_selected_wells, this.temp_selection);
            all_selected_wells = this.remove_duplicates(all_selected_wells);
            return all_selected_wells;
        },
        all_condition_sets: function () {
            var self = this;
            var flags = [];
            var output = [];
            for(var i = 0; i < self.treatments.length; i++) {
                if( flags[self.treatments[i].condition_set]) continue;
                flags[self.treatments[i].condition_set] = true;
                output.push(self.treatments[i].condition_set);
            }
            return output;
        },
        all_roles: function () {
            var self = this;
            var flags = [];
            var output = [];
            for(var i = 0; i < self.treatments.length; i++) {
                if( flags[self.treatments[i].role]) continue;
                flags[self.treatments[i].role] = true;
                output.push(self.treatments[i].role);
            }
            return output;
        },
        all_sample_ids: function () {
            var self = this;
            var flags = [];
            var output = [];
            for(var i = 0; i < self.treatments.length; i++) {
                if( flags[self.treatments[i].sample_id]) continue;
                flags[self.treatments[i].sample_id] = true;
                output.push(self.treatments[i].sample_id);
            }
            return output;
        },
        all_rates: function () {
            var self = this;
            var flags = [];
            var output = [];
            for(var i = 0; i < self.treatments.length; i++) {
                if( flags[self.treatments[i].rate]) continue;
                flags[self.treatments[i].rate] = true;
                output.push(self.treatments[i].rate);
            }
            return output;
        },
        treatments_filtered_list: function () {
            var self = this;



            if (self.plates.length) {
                for (var i = 0; i < self.plates.length; i++) {
                    self.plates[i].filter_match = false;
                    self.plates[i].well_result_count = 0;
                    for (var j = 0; j < self.plates[i].wells.length; j++) {
                        self.plates[i].wells[j].filter_match = false;
                    }
                }
            }

            self.treatment_result_count = 0;
            var filters = this.filters;
            if (self.filters_active) {
                var treatments_array = JSON.parse(JSON.stringify(self.treatments));
                var filter_array = [];
                var active_filter_keys = [];
                for (var key of Object.keys(filters)) {
                    if (filters[key].length) {

                        active_filter_keys.push(key);

                        // var filter_array = resultsArray;
                        // for (var i = 0; i < filters[key].length; i++) {
                        //
                        //     filter_array = filter_array.filter(function (el) {
                        //         return el[key] == filters[key][i];
                        //     });
                        //     if (filter_array.length) {
                        //         resultsArray = resultsArray.concat(filter_array);
                        //         self.treatment_result_count += filter_array.length;
                        //     }
                        //     if (self.plates.length) {
                        //         for (var j = 0; j < self.plates.length; j++) {
                        //             var well_filter_array = JSON.parse(JSON.stringify(self.plates[j].wells));
                        //
                        //             well_filter_array = well_filter_array.filter(function (el) {
                        //                 if (el.content) {
                        //                     var treatment = self.getObjectByKey(self.treatments, 'id', el.content);
                        //                     if (treatment) {
                        //                         if (treatment[key] == filters[key][i]) {
                        //                         }
                        //                         return treatment[key] == filters[key][i];
                        //                     }
                        //                 }
                        //             });
                        //             if (well_filter_array.length) {
                        //                 self.plates[j].filter_match = true;
                        //                 self.plates[j].well_result_count += well_filter_array.length;
                        //                 for (var k = 0; k < well_filter_array.length; k++) {
                        //                     var well_object = self.getObjectByKey(self.plates[j].wells, 'id', well_filter_array[k].id)
                        //                     if (well_object) {
                        //                         well_object.filter_match = true;
                        //                     }
                        //                 }
                        //             }
                        //         }
                        //     }
                        //
                        // }
                    }
                }



                for (var i = 0; i < active_filter_keys.length; i++) {
                    var innerResultsArray = [];
                    for (var j = 0; j < filters[active_filter_keys[i]].length; j++) {

                        for (var k = 0; k < treatments_array.length; k++) {
                            if (treatments_array[k][active_filter_keys[i]] == filters[active_filter_keys[i]][j]) {
                                innerResultsArray.push(treatments_array[k]);
                            }
                        }

                    }

                    treatments_array = innerResultsArray;

                }

                if (self.plates.length) {
                    for (var j = 0; j < self.plates.length; j++) {
                        var well_filter_array = JSON.parse(JSON.stringify(self.plates[j].wells));

                        well_filter_array = well_filter_array.filter(function (el) {
                            if (el.content) {
                                var treatment = self.getObjectByKey(treatments_array, 'id', el.content);
                                if (treatment) {
                                    return true;
                                }
                            }
                        });
                        if (well_filter_array.length) {
                            self.plates[j].filter_match = true;
                            self.plates[j].well_result_count += well_filter_array.length;
                            for (var k = 0; k < well_filter_array.length; k++) {
                                var well_object = self.getObjectByKey(self.plates[j].wells, 'id', well_filter_array[k].id)
                                if (well_object) {
                                    well_object.filter_match = true;
                                }
                            }
                        }
                    }
                }

                self.treatment_result_count = treatments_array.length;

                self.selected_treatments = [];

                // return treatments_array.sort(function(a,b){
                //     return parseInt(a.id) - parseInt(b.id);
                // });

                return self.sort_treatments(treatments_array);

            }
            self.selected_treatments = [];
            //return self.treatments;
            return self.sort_treatments(self.treatments);
        },
        filters_active: function () {
            var filters = this.filters;
            for (var key of Object.keys(filters)) {
                if (filters[key].length) {
                    return true;
                }
            }
            return false;
        },
        tooltip_offset: function () {
            if (this.plates[this.current_plate_index].size >= 384) {
                return -4
            }
            else {
                return -8;
            }
        },
    },
});

jQuery(document).on('mousedown', function (e) {
    if (jQuery(e.target).is('.plate-container .drag-select-container, .plate-top-bar, .plate-corner, .plate-columns, .plate-rows')) {
        app.selected_wells = [];
        if (app.edit_mode) {
            app.reset_highlight();
        }
    }
});

jQuery(document).on('fi-modal:hidden', '.add_plate_modal', function () {
    app.close_add_plate();
});
jQuery(document).on('fi-modal:hidden', '.edit_plate_modal', function () {
    app.close_edit_plate();
});

jQuery(document).on('fi-modal:hidden', '.generate_plates_modal', function () {
    app.close_generate_plates();
});

jQuery(document).on('fi-modal:hidden', '.generate_trays_modal, .generate_trays_all_modal', function () {
    app.close_generate_trays();
});

jQuery(document).on('fi-modal:hidden', '.randomize_modal, .randomize_all_modal', function () {
    app.close_randomize();
});

jQuery(document).on('fi-modal:hidden', '.clone_plate_modal', function () {
    app.close_clone_plate();
});

jQuery(document).on('fi-dropdown:shown', '.choose-layout', function () {
    jQuery(this).find('.fi-search input[type]').focus();
});

jQuery(document).on('click', '.plate-dropdown .fi-dropdown-content li a', function () {
    Figure.toggleDropdown(jQuery(this).closest('.fi-dropdown'));
});

jQuery(document).on('fi-dropdown:shown', '.filter-trigger', function (e, dropdownTrigger, dropdownContent) {
    app.$nextTick(function () {
        dropdownContent.find('.fi-search input[type]').focus();
    });
});
