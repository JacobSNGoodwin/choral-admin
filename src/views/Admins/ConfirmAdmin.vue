<!-- <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  ref="password"
                  :class="{'input': true, 'is-danger': errors.has('password') }"
                  name="password"
                  v-model="password"
                  type="password"
                  data-vv-delay="1000"
                  v-validate="'required|min:6'"
                  placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
                <p
                  v-if="errors.has('password')"
                  class="help is-danger">{{ errors.first('password') }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left">
                <input
                  :class="{'input': true, 'is-danger': errors.has('confirmPassword') }"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  v-validate="'required|confirmed:password'"
                  data-vv-as="password confirmation"
                  placeholder="Confirm Password">
                <span
                  v-if="!errors.has('confirmPassword')
                    && fields.confirmPassword
                    && fields.confirmPassword.dirty"
                  class="icon is-small is-left has-text-success">
                  <i class="fas fa-check"></i>
                </span>
                <p
                  v-if="errors.has('confirmPassword')"
                  class="help is-danger">{{ errors.first('confirmPassword') }}</p>
              </div>
            </div> -->
